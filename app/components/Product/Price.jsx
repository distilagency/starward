import React from 'react';

export function Price(props) {
  const {
    price,
    salePrice,
    regularPrice,
    productType
  } = props;
  switch (productType) {
    // Simple product price
    case 'simple':
      return (
        <div className="price-container">
          { salePrice ? (
            <div className="price">
              <p className="regular-price">Was {regularPrice}</p>
              <p className="sale-price">Now {salePrice}</p>
            </div>
          ) : (
            <div className="price">
              <p className="regular-price">{regularPrice}</p>
            </div>
          )}
        </div>
      );
    // Variable product price
    case 'variable':
      return (
        <div className="price-container">
          <div className="price">{price}</div>
        </div>
      );
    default:
      return null;
  }
}
