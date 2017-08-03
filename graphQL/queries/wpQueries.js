import axios from 'axios';
import { WP_API, POSTS_PER_PAGE } from '../../app/config/app';

/* ----------- WP REST API v2 endpoints ----------- */
const WP_API_ROOT = `${WP_API}/wp/v2`;
const wpPagesUrl = `${WP_API_ROOT}/pages`;
const wpPostsUrl = `${WP_API_ROOT}/posts`;
const wpCategoriesUrl = `${WP_API_ROOT}/categories`;
const wpUsersUrl = `${WP_API_ROOT}/users`;

const wpQueries = {
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
  // Category page data being mapped to schema keys from WP REST API v2
  // response triggered in the below Query object
  Category: {
    posts(category, args) {
      const pageNumber = args.page ? args.page : 1;
      const wpCategoryPostsURL = `${wpPostsUrl}?categories=${category.details.id}&page=${pageNumber}&per_page=${POSTS_PER_PAGE}`;
      return axios.get(wpCategoryPostsURL)
      .then(res => {
        return {
          items: res.data,
          totalItems: res.headers['x-wp-total'],
          totalPages: res.headers['x-wp-totalpages']
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
          items: res.data,
          totalItems: res.headers['x-wp-total'],
          totalPages: res.headers['x-wp-totalpages']
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
      .then(res => {
        return res.data[0];
      });
    },
    posts(query, args) {
      const pageNumber = args.page ? args.page : 1;
      const perPage = args.perPage ? args.perPage : POSTS_PER_PAGE;
      const wpActivePostsUrl = `${wpPostsUrl}?page=${pageNumber}&per_page=${perPage}`;
      return axios.all([
        axios.get(wpActivePostsUrl),
        axios.get(wpCategoriesUrl)
      ])
      .then(([
        posts,
        categories
      ]) => {
        return {
          items: posts.data,
          categories: categories.data,
          totalItems: posts.headers['x-wp-total'],
          totalPages: posts.headers['x-wp-totalpages']
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
    },
    search(query, args) {
      const { type, term, page, perPage } = args;
      const wpSearchResultsUrl = `${WP_API_ROOT}/${type}?search=${term}&page=${page}&per_page=${perPage}`;
      return axios.get(wpSearchResultsUrl)
      .then(res => {
        return {
          items: res.data,
          totalItems: res.headers['x-wp-total'],
          totalPages: res.headers['x-wp-totalpages']
        };
      });
    }
  }
};

export default wpQueries;
