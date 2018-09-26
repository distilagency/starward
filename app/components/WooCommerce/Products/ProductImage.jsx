import React from 'react';

export const ProductImage = (props) => {
  const { baseImage } = props;
  return (
    <img src={`${baseImage.src}`} alt={baseImage.alt} />
  );
};
