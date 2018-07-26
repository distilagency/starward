import React from 'react';

export const RenderContent = (props) => {
  const { content } = props;
  return (
    <div
      className="entry-content"
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
};
