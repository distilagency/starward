import React from 'react';

export const FeaturedImage = (props) => {
  const {
    size,
    sizes,
    alt,
    url
  } = props;
  if (!url) {
    return <img src="/assets/images/default-blog-featured-image.jpg" alt="Dummy Thumbnail" />;
  }
  const featured = sizes[size] ? sizes[size].source_url : url;
  return (
    <img src={featured} alt={alt} />
  );
};
