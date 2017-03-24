import { WP_URL } from '../../config/app';

/* Get slug from Wordpress URL */
export const getSlug = (url) => {
  if (url === '#') {
    return '#';
  } else if (url.indexOf(WP_URL) !== -1) {
    return url.split(WP_URL)[1];
  }
  return url;
};

/* Render title in hypen joined, lowercase string */
export const getClassFromTitle = (title) => {
  return title.split(' ').join('-').toLowerCase();
};
