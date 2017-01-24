import React from 'react';

export const FeaturedImage = props => {
  const { size, sizes, alt, url } = props;
  const featured = sizes[size] ? sizes[size].source_url : url;
  return (
    <img src={featured} alt={alt} />
  );
};
