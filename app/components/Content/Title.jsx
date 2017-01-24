import React from 'react';

export const Title = props => {
  const { title, tag } = props;
  const Tag = tag ? tag : 'h1';
  return (
    <header className="entry-header">
      <Tag className="entry-title">{title}</Tag>
    </header>
  );
};
