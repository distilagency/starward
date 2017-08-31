// Wordpress
export const WP_URL = 'http://localhost/starward_wp';
export const WP_API = `${WP_URL}/wp-json`;
export const WP_AUTH = new Buffer('username:password').toString('base64');

// Redis
export const REDIS_PREFIX = null; // change me to your project name, for example: 'starward-'

// General
export const serversideStateCharacterBlacklistRegex = /\u2028/g;
