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
    <ul className="cart-table">
      {items.map(item => (
        <li className="table-row" key={item.key}>
          <div className="product-image" />
          <div className="product-info">
            <div className="name">{item.product_name}</div>
          </div>
          <div className="product-price">
            {`$${item.line_subtotal}`}
          </div>
          <div className="quantity">
            <NavLink to="#" className="increase-qty-button" onClick={event => increaseQuantityHandler(event, item.key)} />
            <span className="quantity-value">{`${item.quantity}`}</span>
            <NavLink to="#" className="decrease-qty-button" onClick={event => decreaseQuantityHandler(event, item.key)} />
          </div>
          <NavLink
            to="#"
            className="remove-button"
            onClick={event => removeFromCartHandler(event, item.key)}>
            Remove
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
