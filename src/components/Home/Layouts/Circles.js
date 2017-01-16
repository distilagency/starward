import React, { PropTypes } from 'react';
import { Circle } from './Circles/Circle';

export const Circles = props => {
  const { items } = props;
  if(!items){
    return null;
  }
  return(
    <ul>
      {items.map((item, index) => <Circle key={index} {...item} />)}
    </ul>
  );
};

Circles.propTypes = {
  items: PropTypes.array,
};
