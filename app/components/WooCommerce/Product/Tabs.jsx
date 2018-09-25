import React from 'react';

export function Tabs(props) {
  const { description } = props;
  return (
    <div className="product-tabs">
      <div className="tab description">
        <h2>Product Description</h2>
        <p dangerouslySetInnerHTML={{__html: description}} />
      </div>
    </div>
  );
}
