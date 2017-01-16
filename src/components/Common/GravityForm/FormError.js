import React, { PropTypes } from 'react';

export const FormError = props => {
  const { error_message, showError } = props;
  if(showError){
    return <div>{error_message}</div>;
  }
  return <span></span>;
}

FormError.propTypes = {
  error_message: PropTypes.string,
  showError: PropTypes.bool,
}
