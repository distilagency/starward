import React from 'react';
import { NavLink } from 'react-router-dom';
import './CartTable.scss';

export const CartTable = (props) => {
  const {
    items,
    removeFromCartHandler,
    increaseQuantityHandler,
    decreaseQuantityHandler
  } = props;
  return (
    <div className="cart-table">
      <div className="table-header">
        <div className="image-header" />
        <div className="info-header" />
        <div className="price-header">Price</div>
        <div className="quantity-header">Qty</div>
        <div className="total-price-header">Total</div>
        <div className="remove-header" />
      </div>
      <ul className="table-rows">
        {items.map(item => (
          <li className="row" key={item.key}>
            <div className="image" />
            <div className="info">
              <div className="name">{item.product_name}</div>
            </div>
            <div className="price">
              {`$${item.line_subtotal / item.quantity}`}
            </div>
            <div className="quantity">
              <NavLink to="#increase-qty" className="increase-qty-button" onClick={event => increaseQuantityHandler(event, item.key)}>+</NavLink>
              <span className="quantity-value">{`${item.quantity}`}</span>
              <NavLink to="#decrease-qty" className="decrease-qty-button" onClick={event => decreaseQuantityHandler(event, item.key)}>-</NavLink>
            </div>
            <div className="total-price">
              {`$${item.line_subtotal}`}
            </div>
            <div className="remove">
              <NavLink to="#remote-item" onClick={event => removeFromCartHandler(event, item.key)}>x</NavLink>
            </div>
          </li>
        ))}
      </ul>
      <div className="table-footer">
        Footer
      </div>
    </div>
  );
};
