import React, { PropTypes } from 'react';

export const Title = props => {
  const { title, tag } = props;
  const Tag = tag ? tag : 'h1';
  return (
    <header className="entry-header">
      <Tag className="entry-title">{title}</Tag>
    </header>
  );
};

Title.propTypes = {
  title: PropTypes.string,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
};
