import { WP_URL } from '../../config/app';

export const getWPSlug = (url) => {
  if (url === '#') {
    return '#';
  }
  return url.split(WP_URL)[1];
};
