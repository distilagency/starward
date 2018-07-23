export const queryObjectToString = (queryObj) => {
  if (!queryObj) return null;
  const queryString = Object.keys(queryObj).map((key, index) => {
    return `${index === 0 ? '?' : ''}${key}=${queryObj[key]}`;
  }).join('&');
  return `${queryString}`;
};

export const getQueryString = (queryObj, newKey, newValue) => {
  const queryStringsObj = queryObj;
  const newValueString = newValue.toString();
  // No filters applied
  if (!queryStringsObj || Object.keys(queryStringsObj).length < 1) return `?${newKey}=${newValueString}`;
  const keyExistsInQuery = (newKey in queryStringsObj);
  // If the attribute is already being filtered
  if (keyExistsInQuery) {
    const oldQueryArr = queryStringsObj[newKey].split(',');
    // If the new attribute option is not being filtered yet
    if (!oldQueryArr.includes(newValueString)) {
      // Add attribute option id to key
      const newQueryArr = [...oldQueryArr, newValueString];
      const newQueryString = newQueryArr.join(',');
      queryStringsObj[newKey] = newQueryString;
    } else {
      // If the new attribute option is already being filtered
      // Remove attribute option id from key
      const indexOfNewValue = oldQueryArr.indexOf(newValueString);
      oldQueryArr.splice(indexOfNewValue, 1);
      if (oldQueryArr.length < 1) {
        // Remove attribute key from query
        delete queryStringsObj[newKey];
      } else {
        // Remove option id from attribute options in query
        const newQueryString = oldQueryArr.join(',');
        queryStringsObj[newKey] = newQueryString;
      }
    }
  } else {
    // If the attribute is not currently being filtered
    // Create a new attribute key and add the attribute option to it
    queryStringsObj[newKey] = newValueString;
  }
  return queryObjectToString(queryStringsObj);
};
