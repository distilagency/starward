import React from 'react';
import { Loading } from '../Content/Loading';
import './Button.scss';

export const Button = (props) => {
  const { text, showLoading, className } = props;
  return (
    <button type="submit" className={`form-submit-button button ${className}`} disabled={showLoading}>
      {showLoading ? <Loading inline /> : text}
    </button>
  );
};
