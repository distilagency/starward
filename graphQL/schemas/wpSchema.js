const wpSchema = `
  type Page {
    # Page data
    title: String,
    content: String,
    slug: String,
    type: String,
    link: String,
    yoast: JSON,
    acf: JSON,
    featuredImage: FeaturedImage
  }

  type Posts {
    # Posts list
    items: [Post]
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
    link: String,
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
    posts (page: Int, perPage: Int): Posts
    category (slug: String, page: Int): Category
    author (name: String, page: Int): Author
    post (slug: String): Post
    search (type: String, term: String, page: Int, perPage: Int): Posts
  }
`;

export default wpSchema;
