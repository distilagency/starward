import React from 'react';
import { Link } from 'react-router-dom';
import './MiniCartContent.scss';

const CartItems = (props) => {
  const { items, removeFromCartHandler } = props;
  return (
    items.map(item => (
      <li className="cart-item" key={item.key}>
        <div className="product-image" style={{ backgroundImage: `url('${item.product_image}')` }} />
        <div className="product-info">
          <div className="name">
            <span>{item.product_name}</span>
            <Link
              to="#"
              className="remove-button"
              onClick={event => removeFromCartHandler(event, item.key)} />
          </div>
          <div className="subtotal">
            <span className="item-subtotal">{`${item.quantity} x $${(parseFloat(item.line_subtotal) / parseFloat(item.quantity)).toFixed(2)}`}</span>
          </div>
        </div>
      </li>
    ))
  );
};

export const MiniCartContent = (props) => {
  const { items, removeFromCartHandler, toggleMiniCartHandler } = props;
  let subtotal = 0;
  for (let i = 0; i < items.length; i += 1) {
    subtotal += items[i].line_subtotal;
  }
  if (!items || items.length <= 0) {
    return (
      <div className="cart-contents cart-empty">
        <span className="empty-cart-message">Your cart is empty</span>
        <div className="cart-actions">
          <Link to="#close-minicart" className="button" onClick={event => toggleMiniCartHandler(event)}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="cart-contents">
      <span className="cart-title">{`Your cart (${items.length})`}</span>
      <ul className="cart-items">
        <CartItems items={items} removeFromCartHandler={removeFromCartHandler} />
      </ul>
      <div className="cart-totals">
        <div className="totals-row subtotal">
          <span className="label">Subtotal:</span>
          <span className="value">{`$${parseFloat(subtotal).toFixed(2)}`}</span>
        </div>
      </div>
      <div className="cart-actions">
        <Link to="/cart" className="button orange">Checkout</Link>
      </div>
    </div>
  );
};
