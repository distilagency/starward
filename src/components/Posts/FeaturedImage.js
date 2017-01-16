import React, { PropTypes } from 'react';

export const FeaturedImage = props => {
  const { size, media_details, source_url, alt_text } = props;
  const { sizes } = media_details;
  return (
    <img src={sizes[size] ? sizes[size].source_url : source_url} alt={alt_text} />
  );
};

FeaturedImage.propTypes = {
  size: PropTypes.string,
  media_details: PropTypes.object,
  source_url: PropTypes.string,
  alt_text: PropTypes.string,
};
