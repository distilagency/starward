import React from 'react';
import './ErrorBlock.scss';

export const ErrorBlock = (props) => {
  const { errorMessage } = props;
  return (
    <div className="error-block">
      <p className="error-message">
        {errorMessage}
      </p>
    </div>
  );
};
