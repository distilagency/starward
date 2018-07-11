import React from 'react';

export const FormConfirmation = (props) => {
  const { confirmation, showConfirmation } = props;
  if (showConfirmation) return <p>{confirmation}</p>;
  return <span />;
};
