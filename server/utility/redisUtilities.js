export const createKeyGenerator = (prefix) => {
  return (key) => {
    return prefix + key;
  };
};
