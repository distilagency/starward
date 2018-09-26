import React from 'react';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { CheckoutProgressBar } from '../../WooCommerce/Common/CheckoutProgressBar';
import './OrderConfirmation.scss';

export const OrderConfirmation = (props) => {
  const { title, subtitle, location } = props;
  const queryParams = qs.parse(location.search);
  // const hasOrderId = Object.prototype.hasOwnProperty.call(queryParams, 'order_id');
  const { order_id: orderId } = queryParams;
  const checkoutStages = [
    { label: 'cart', link: false },
    { label: 'payment', link: false },
    { label: 'receipt', link: false },
  ];
  return (
    <section className="order-confirmation-block">
      <div className="wrap">
        <h1>Order Confirmation</h1>
        <CheckoutProgressBar
          stages={checkoutStages}
          currentStageIndex={2} />
        <div className="text-container">
          <h2>{title}</h2>
          { orderId &&
            <p>Your order number is <span className="order-number">#{orderId}</span></p>
          }
          <p>{subtitle}</p>
          <Link className="button" to="/">Return to home</Link>
        </div>
      </div>
    </section>
  );
};
