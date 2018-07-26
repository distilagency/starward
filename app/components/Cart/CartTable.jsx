import React from 'react';
import { NavLink } from 'react-router-dom';
import './CartTable.scss';

export const CartTable = (props) => {
  const {
    items,
    totals,
    removeFromCartHandler,
    updateQuantityHandler
  } = props;

  if (!items || items.length <= 0) {
    return (
      <div className="empty-cart">
        Your Cart is empty
      </div>
    );
  }
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
              <NavLink to="#increase-qty" className="increase-qty-button" onClick={event => updateQuantityHandler(event, item.key, (item.quantity + 1))}>+</NavLink>
              <span className="quantity-value">{`${item.quantity}`}</span>
              <NavLink to="#decrease-qty" className="decrease-qty-button" onClick={event => updateQuantityHandler(event, item.key, (item.quantity - 1))}>-</NavLink>
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
        <ul className="totals">
          <li className="row subtotal">
            <span className="label">Subtotal: </span>
            <span className="value">{totals.cart_contents_total}</span>
          </li>
          <li className="row tax">
            <span className="label">Tax: </span>
            <span className="value">{totals.total_tax}</span>
          </li>
          <li className="row shipping">
            <span className="label">Shipping: </span>
            <span className="value">{totals.shipping_total}</span>
          </li>
          <li className="row total">
            <span className="label">Total: </span>
            <span className="value">{totals.total}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
