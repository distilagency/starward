import React from 'react';
import './QuantitySelector.scss';

export const QuantitySelector = (props) => {
  const {
    quantity,
    decreaseQuantityHandler,
    increaseQuantityHandler
  } = props;
  return (
    <div className="quantity-selector">
      <button
        className="quantity-button decrement-button"
        disabled={quantity <= 1}
        onClick={event => decreaseQuantityHandler(event)}>
        <span>-</span>
      </button>
      <span className="quantity-counter">{quantity}</span>
      <button
        className="quantity-button increment-button"
        disabled={quantity >= 99}
        onClick={event => increaseQuantityHandler(event)}>
        <span>+</span>
      </button>
    </div>
  );
};
