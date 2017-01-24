import React from 'react';

export const FormError = props => {
  const { errorMessage, showError } = props;
  if (showError) return <div>{errorMessage}</div>;
  return <span />;
};
