import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = props => {
  const { siteName, url } = props;
  return (
    <Link className="brand" to={url}>{siteName}</Link>
  );
};
