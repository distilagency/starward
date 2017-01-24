import { HOST, PORT, ENV } from './env';

// Wordpress
export const WP_URL = 'http://localhost/starward_wp';
export const API_URL = `${WP_URL}/wp-json`;
export const WP_AUTH = new Buffer('username:password').toString('base64');
export const POSTS_PER_PAGE = 10;
export const HOME_SLUG = 'homepage';
export const BLOG_SLUG = 'blog';
export const CATEGORY_SLUG = 'category';
export const AUTHOR_SLUG = 'author';

// GraphQL
export const ROOT_API = 'http://localhost:3000/api';

// General
export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

// Starward
export const baseURL = `http://${HOST}:${PORT}`;

// Google Analytics
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;
