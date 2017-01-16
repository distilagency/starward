import React, { PropTypes } from 'react';

export const FormConfirmation = props => {
  const { confirmation_message, showConfirmation } = props;
  if(showConfirmation){
    return <div dangerouslySetInnerHTML={{__html: confirmation_message}} />;
  }
  return <span></span>;
};

FormConfirmation.propTypes = {
  confirmation_message: PropTypes.string,
  showConfirmation: PropTypes.bool,
};
