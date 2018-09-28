import React from 'react';

export const FormConfirmation = (props) => {
  const { confirmation, showConfirmation } = props;
  // eslint-disable-next-line
  if (showConfirmation) return <div className="form-confirmation" dangerouslySetInnerHTML={{__html: confirmation}} />;
  return <span />;
};
