// Wordpress
export const WP_AUTH = new Buffer('root:root').toString('base64');

// Redis
export const REDIS_PREFIX = 'starward-'; // change me to your project name, for example: 'starward-'

// General
export const serversideStateCharacterBlacklistRegex = /\u2028/g;
