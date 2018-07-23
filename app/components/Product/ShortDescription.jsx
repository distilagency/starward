import React from 'react';

export function ShortDescription({text}) {
  if (text) {
    return (
      <div className="short-description">
        <p dangerouslySetInnerHTML={{__html: text}} />
      </div>
    );
  }
  return null;
}
