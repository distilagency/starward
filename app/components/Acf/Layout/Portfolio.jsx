import React from 'react';

export const Portfolio = props => {
  const { name } = props;
  return (
    <ul>
      <li>{name}</li>
    </ul>
  );
};
