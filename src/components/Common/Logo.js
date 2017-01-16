import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const Logo = props => {
  const { site_name, url } = props;
  return (
    <Link className="brand" to={url}>{site_name}</Link>
  );
};

Logo.propTypes = {
  site_name: PropTypes.string,
  url: PropTypes.string,
};
