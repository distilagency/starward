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
  return !isEmpty(required, value);
};
export const selectValidation = (required, value, placeholder) => {
  return !((value === placeholder) && required);
};
export const checkboxValidation = (required, values) => {
  return !(required && values.length < 1);
};
export const radioValidation = (required, value) => {
  return !isEmpty(required, value);
};
export const numberValdation = (required, value) => {
  return !isEmpty(required, value);
};
export const emailValdation = (required, value) => {
  return !(isEmpty(required, value) || (value && !isEmail(value)));
};
export const phoneValdation = (required, value) => {
  return !isEmpty(required, value);
};
export const websiteValdation = (required, value) => {
  return !(isEmpty(required, value) || (value && !isUrl(value)));
};
