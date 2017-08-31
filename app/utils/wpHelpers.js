/* Render title in hypen joined, lowercase string */
export const getClassFromTitle = (title) => {
  return title.split(' ').join('-').toLowerCase();
};
