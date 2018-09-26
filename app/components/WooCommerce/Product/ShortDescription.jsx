import React from 'react';

export function ShortDescription(props) {
  const { text } = props;
  if (!text) return null;
  return (
    <div className="short-description">
      <p dangerouslySetInnerHTML={{__html: text}} />
    </div>
  );
}
