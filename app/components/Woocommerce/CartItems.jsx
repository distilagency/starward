import React from 'react';
import { NavLink } from 'react-router-dom';

export const CartItems = (props) => {
  const { items, removeFromCartHandler } = props;
  return (
    <ul className="cart-items">
      {items.map(item => (
        <li className="cart-item" key={item.key}>
          <div className="product-image" />
          <div className="product-info">
            <div className="name">{item.product_name}</div>
            <div className="quantity">
              <span className="value">{`x ${item.quantity}`}</span>
            </div>
            <div className="item-footer">
              <NavLink
                to="#"
                className="remove-button"
                onClick={event => removeFromCartHandler(event, item.key)}>
                Remove
              </NavLink>
              <span className="item-subtotal">{`$${item.line_subtotal}`}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
