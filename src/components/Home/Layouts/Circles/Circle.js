import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const Circle = props => {
  const { link, title } = props;
  return (
    <Link to={link}>{title}</Link>
  );
};

Circle.propTypes = {

};
