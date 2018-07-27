import React from 'react';
import './Loading.scss';

export const Loading = (props) => {
  const { inline } = props;
  return (
    <div className={`loading ${inline && 'inline'}`}>
      <div className="loading-indicator" />
    </div>
  );
};
