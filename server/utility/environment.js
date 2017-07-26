import { ENV, REDIS } from '../../env';

export const isDevelopment = ENV === 'development';
export const isRedisEnabled = REDIS === 'force-enable' || (ENV === 'production' && REDIS === 'enabled');

export default {
  isDevelopment,
  isRedisEnabled
};
