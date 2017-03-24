import React from 'react';

export const Button = props => {
  const { text, showLoading, className } = props;
  return (
    <button type="submit" className={`button ${className}`}>{showLoading ? 'Loading' : text}</button>
  );
};
