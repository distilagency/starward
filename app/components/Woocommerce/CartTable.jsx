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
  console.log({items});
  return (
    <div className="cart-table">
      <div className="table-header">
        <div className="image-header" />
        <div className="info-header" />
        <div className="price-header" />
        <div className="quantity-header">
          QTY
        </div>
        <div className="total-price-header" />
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
              <NavLink to="#" className="increase-qty-button" onClick={event => increaseQuantityHandler(event, item.key)}>+</NavLink>
              <span className="quantity-value">{`${item.quantity}`}</span>
              <NavLink to="#" className="decrease-qty-button" onClick={event => decreaseQuantityHandler(event, item.key)}>-</NavLink>
            </div>
            <div className="total-price">
              {`$${item.line_subtotal}`}
            </div>
            <div className="remove">
              <NavLink to="#" onClick={event => removeFromCartHandler(event, item.key)}>x</NavLink>
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
