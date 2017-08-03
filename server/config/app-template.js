// Wordpress
export const WP_AUTH = new Buffer('username:password').toString('base64');

// Redis
export const REDIS_PREFIX = null; // change me to your project name, for example: 'starward-'

// General
export const serversideStateCharacterBlacklistRegex = /\u2028/g;
