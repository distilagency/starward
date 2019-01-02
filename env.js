export const HOST = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3000';
export const ENV = process.env.NODE_ENV || 'development';
export const REDIS = process.env.REDIS_ENABLED || 'disabled';
export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;
