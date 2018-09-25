import React from 'react';
import { Link } from 'react-router-dom';
import { QuantitySelector } from '../Product/QuantitySelector';
import './CartTable.scss';

export const CartTable = (props) => {
  const {
    items,
    totals,
    updatingItems,
    updatingTotals,
    removeFromCartHandler,
    updateQuantityHandler
  } = props;
  const updatingCart = updatingItems || updatingTotals;
  return (
    <div className="cart-table">
      <div className="table-header">
        <span className="col-header image-header" />
        <span className="col-header info-header">Product</span>
        <span className="col-header quantity-header">Qty</span>
        <span className="col-header total-price-header">Price</span>
        <span className="col-header remove-header" />
      </div>
      <ul className={`table-rows ${updatingCart ? 'updating' : ''}`}>
        {items.map((item) => {
          return (
            <li className="row" key={item.key}>
              <div className="image" style={{ backgroundImage: `url('${item.product_image}')` }} />
              <div className="details">
                <div className="info">
                  <div className="name">{item.product_name}</div>
                </div>
                <div className="quantity">
                  <QuantitySelector
                    quantity={item.quantity}
                    increaseQuantityHandler={event => updateQuantityHandler(event, item.key, item.quantity + 1)}
                    decreaseQuantityHandler={event => updateQuantityHandler(event, item.key, item.quantity - 1)} />
                </div>
                <div className="total-price">
                  {`$${parseFloat(item.line_subtotal).toFixed(2)}`}
                </div>
                <div className="remove">
                  <Link className="remove-button" to="#remote-item" onClick={event => removeFromCartHandler(event, item.key)} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={`table-footer ${updatingCart ? 'updating' : ''}`}>
        {Object.keys(totals).length > 0 &&
          <ul className="totals">
            <li className="row subtotal">
              <span className="label">Subtotal</span>
              <span className="value">{`$${parseFloat(totals.cart_contents_total).toFixed(2)}`}</span>
            </li>
            <li className="row tax">
              <span className="label">Tax</span>
              <span className="value">{`$${parseFloat(totals.total_tax).toFixed(2)}`}</span>
            </li>
            <li className="row shipping">
              <span className="label">Shipping</span>
              <span className="value">{`$${parseFloat(totals.shipping_total).toFixed(2)}`}</span>
            </li>
            <li className="row total">
              <span className="label">Total</span>
              <span className="value">{`$${parseFloat(totals.total).toFixed(2)}`}</span>
            </li>
          </ul>
        }
      </div>
    </div>
  );
};
