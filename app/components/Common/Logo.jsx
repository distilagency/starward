import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

export const Logo = (props) => {
  const { siteName, url } = props;
  return (
    <Link className="logo" to={url}>{siteName}</Link>
  );
};
