const isEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const isUrl = (url) => {
  const pattern = new RegExp('^(https?:\\/\\/)?' +
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
  '((\\d{1,3}\\.){3}\\d{1,3}))' +
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
  '(\\?[;&a-z\\d%_.~+=-]*)?' +
  '(\\#[-a-z\\d_]*)?$', 'i');
  return pattern.test(url);
};
const isEmpty = (required, value) => {
  if (required && !value) {
    return true;
  }
  return false;
};

export const textValdation = (required, value) => {
  return isEmpty(required, value) ? false : true;
};
export const selectValidation = (required, value, placeholder) => {
  return value === placeholder && required ? false : true;
};
export const checkboxValidation = (required, values) => {
  return required && values.length < 1 ? false : true;
};
export const radioValidation = (required, value) => {
  return isEmpty(required, value) ? false : true;
};
export const numberValdation = (required, value) => {
  return isEmpty(required, value) ? false : true;
};
export const emailValdation = (required, value) => {
  return isEmpty(required, value) || value && !isEmail(value) ? false : true;
};
export const phoneValdation = (required, value) => {
  return isEmpty(required, value) ? false : true;
};
export const websiteValdation = (required, value) => {
  return isEmpty(required, value) || value && !isUrl(value) ? false : true;
};
