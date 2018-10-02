import React from 'react';
import './ErrorBlock.scss';

export const ErrorBlock = (props) => {
  const {
    errorMessage = 'Whoops, look like something went wrong here!'
  } = props;
  return (
    <div className="error-block">
      <p className="error-message">
        {errorMessage}
      </p>
    </div>
  );
};
