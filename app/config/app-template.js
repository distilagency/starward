import { HOST, PORT, ENV } from '../../env';

// Wordpress
export const SITE_NAME = 'Starward';
export const POSTS_PER_PAGE = 10;
export const HOME_SLUG = 'home';
export const BLOG_SLUG = 'blog';
export const CATEGORY_SLUG = 'category';
export const AUTHOR_SLUG = 'author';
export const SEARCH_SLUG = 'search';

// Starward
export const baseURL = `http://${HOST}:${PORT}`;
// if using docker:
// export const baseURL = `http://dev.docker`;

// GraphQL
export const ROOT_API = `${baseURL}/api`;

// General
export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';
