import graphqlSchema from 'graphql_json';
import axios from 'axios';
import { WP_API, POSTS_PER_PAGE } from '../../config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const wpPagesUrl = `${WP_API}/wp/v2/pages`;
const wpPostsUrl = `${WP_API}/wp/v2/posts`;
const wpCategoriesUrl = `${WP_API}/wp/v2/categories`;
const wpUsersUrl = `${WP_API}/wp/v2/users`;

/* ----------- GraphQL Schema using graph.ql ----------- */
const wpSchema = graphqlSchema(`
  type Page {
    # Page data
    title: String,
    content: String,
    slug: String,
    yoast: JSON,
    acf: JSON,
    featuredImage: FeaturedImage
  }

  type Posts {
    # Posts list
    posts: [Post]
    categories: [Taxonomy]
    totalItems: Int
    totalPages: Int
  }

  type Category {
    # Category page
    details: Taxonomy
    posts (page: Int): Posts
  }

  type Author {
    # Author page
    details: User
    posts (page: Int): Posts
  }

  type Post {
    # Individual post
    slug: String,
    title: String,
    content: String,
    excerpt: String,
    date: String,
    featuredImage: FeaturedImage,
    categories: [Taxonomy],
    author: User,
    acf: JSON,
    yoast: JSON,
    pagination: Pagination
  }

  type Taxonomy {
    # Individual taxonomy
    slug: String,
    name: String,
    description: String,
    parent: Int,
    count: Int,
    id: Int
  }

  type User {
    # User data
    id: Int,
    name: String,
    slug: String,
    avatar: JSON
  }

  type FeaturedImage {
    # Featured image url and thumbnails
    alt: String,
    url: String,
    sizes: JSON
  }

  type Pagination {
    # Next and previous posts on individual post page
    next: Post,
    previous: Post
  }

  type Query {
    page (slug: String): Page
    posts (page: Int): Posts
    category (slug: String, page: Int): Category
    author (name: String, page: Int): Author
    post (slug: String): Post
  }
`, {
  /* ----------- Fetch data for Schema ----------- */
  // Page items being mapped to schema keys from WP REST API v2
  // response triggered in the below Query object
  Page: {
    title(page) {
      return page.title.rendered;
    },
    content(page) {
      return page.content.rendered;
    },
    featuredImage(page) {
      return page.better_featured_image;
    }
  },
  // Posts list being mapped to schema keys from WP REST API v2
  // response triggered in the below Query object
  Posts: {
    posts(posts) {
      return posts.active_posts;
    },
    categories(posts) {
      return posts.categories;
    },
    totalItems(posts) {
      return posts.total_items;
    },
    totalPages(posts) {
      return posts.total_pages;
    }
  },
  // Category page data being mapped to schema keys from WP REST API v2
  // response triggered in the below Query object
  Category: {
    posts(category, args) {
      const pageNumber = args.page ? args.page : 1;
      const wpCategoryPostsURL = `${wpPostsUrl}?categories=${category.details.id}&page=${pageNumber}&per_page=${POSTS_PER_PAGE}`;
      return axios.get(wpCategoryPostsURL)
      .then(res => {
        return {
          active_posts: res.data,
          total_items: res.headers['x-wp-total'],
          total_pages: res.headers['x-wp-totalpages']
        };
      });
    }
  },
  // Author page data being mapped to schema keys from WP REST API v2
  // response triggered in the below Query object
  Author: {
    posts(author, args) {
      const pageNumber = args.page ? args.page : 1;
      const wpAuthorPostsURL = `${wpPostsUrl}?author=${author.details.id}&page=${pageNumber}&per_page=${POSTS_PER_PAGE}`;
      return axios.get(wpAuthorPostsURL)
      .then(res => {
        return {
          active_posts: res.data,
          total_items: res.headers['x-wp-total'],
          total_pages: res.headers['x-wp-totalpages']
        };
      });
    }
  },
  // Post data being mapped to schema keys from WP REST API v2
  // response triggered in the below Query object
  Post: {
    title(post) {
      return post.title.rendered;
    },
    content(post) {
      return post.content.rendered;
    },
    excerpt(post) {
      return post.excerpt.rendered;
    },
    featuredImage(post) {
      return post.better_featured_image;
    },
    categories(post) {
      return axios.all(post.categories.map(id => {
        return axios.get(`${wpCategoriesUrl}/${id}`)
        .then(res => res.data);
      }));
    },
    author(post) {
      return axios.get(`${wpUsersUrl}/${post.author}`)
      .then(res => res.data);
    },
    pagination(post) {
      return axios.get(wpPostsUrl)
      .then(res => {
        const activePost = res.data.find(item => item.slug === post.slug);
        const previousPostIndex = res.data.indexOf(activePost) + 1;
        const nextPostIndex = previousPostIndex - 2;
        return { previous: res.data[previousPostIndex], next: res.data[nextPostIndex] };
      });
    }
  },
  // User data being mapped to schema keys from WP REST API v2
  // response triggered in the below Query object
  User: {
    avatar(user) {
      return user.avatar_urls;
    }
  },
  // Featured image data being mapped to schema keys from WP REST API v2
  // response triggered in the below Query object
  FeaturedImage: {
    alt(images) {
      return images.alt_text;
    },
    url(images) {
      return images.source_url;
    },
    sizes(images) {
      return images.media_details.sizes;
    }
  },
  Query: {
    page(query, args) {
      const wpPageURL = `${wpPagesUrl}?slug=${args.slug}`;
      return axios.get(wpPageURL)
      .then(res => res.data[0]);
    },
    posts(query, args) {
      const pageNumber = args.page ? args.page : 1;
      const wpActivePostsUrl = `${wpPostsUrl}?page=${pageNumber}&per_page=${POSTS_PER_PAGE}`;
      return axios.all([
        axios.get(wpActivePostsUrl),
        axios.get(wpCategoriesUrl)
      ])
      .then(([
        posts,
        categories
      ]) => {
        return {
          active_posts: posts.data,
          categories: categories.data,
          total_items: posts.headers['x-wp-total'],
          total_pages: posts.headers['x-wp-totalpages']
        };
      });
    },
    category(query, args) {
      const wpCategoryURL = `${wpCategoriesUrl}?slug=${args.slug}`;
      return axios.get(wpCategoryURL)
      .then(res => {
        return { details: res.data[0] };
      })
      .catch(error => console.log('error', error));
    },
    author(query, args) {
      const wpAuthorURL = `${wpUsersUrl}?slug=${args.name}`;
      return axios.get(wpAuthorURL)
      .then(res => {
        return { details: res.data[0] };
      })
      .catch(error => console.log('error', error));
    },
    post(query, args) {
      return axios.get(`${wpPostsUrl}?slug=${args.slug}`)
      .then(res => res.data[0]);
    }
  }
});

export default wpSchema;
