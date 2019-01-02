// Wordpress
export const WP_URL = 'http://localhost/starward_wp';
// if using docker:
// export const WP_URL = 'http://wp.dev.docker';
export const WP_API = `${WP_URL}/wp-json`;
export const GRAVITY_PUBLIC = 'Add public key from gravity forms settings';
export const GRAVITY_PRIVATE = 'Add private key from gravity forms settings';

// Redis
export const REDIS_PREFIX = null; // change me to your project name, for example: 'starward-'

// General
export const characterBlacklistRegex = /\u2028/g;
