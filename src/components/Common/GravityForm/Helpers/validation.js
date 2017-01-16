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

const isEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const isUrl = (url) => {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  console.log("URL", pattern.test(url));
  return pattern.test(url);
};
const isEmpty = (required, value) => {
  if(required && !value){
    return true;
  }
  return false;
};
