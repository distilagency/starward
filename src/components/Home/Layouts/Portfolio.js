import React, { PropTypes } from 'react';

export const Portfolio = props => {
  const { name } = props;
  return(
    <ul>
      <li>{name}</li>
    </ul>
  );
};

Portfolio.propTypes = {
  name: PropTypes.string,
};
