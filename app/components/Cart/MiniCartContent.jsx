import React from 'react';
import { NavLink } from 'react-router-dom';
import './MiniCartContent.scss';

const CartItems = (props) => {
  const { items, removeFromCartHandler } = props;
  return (
    items.map(item => (
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
    ))
  );
};

export const MiniCartContent = (props) => {
  const { items, removeFromCartHandler } = props;
  let subtotal = 0;
  for (let i = 0; i < items.length; i += 1) {
    subtotal += items[i].line_subtotal;
  }
  if (!items || items.length <= 0) {
    return (
      <div className="empty-cart">
        <span className="title">Your cart is empty...</span>
        <span className="subtitle">...for now</span>
      </div>
    );
  }
  return (
    <div className="cart-contents">
      <ul className="cart-items">
        <CartItems items={items} removeFromCartHandler={removeFromCartHandler} />
      </ul>
      <div className="cart-totals">
        <div className="totals-row subtotal">
          <span className="label">Subtotal:</span>
          <span className="value">{`$${subtotal}`}</span>
        </div>
      </div>
      <div className="cart-actions">
        <NavLink to="/cart" className="cart-action">View Cart</NavLink>
        <NavLink to="/checkout" className="cart-action">Checkout</NavLink>
      </div>
    </div>
  );
};
