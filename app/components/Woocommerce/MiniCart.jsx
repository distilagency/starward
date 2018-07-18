import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCart } from '../../actions/cart';
import './MiniCart.scss';

class MiniCart extends Component {
  state = {
    active: false
  };
  componentDidMount() {
    const { fetchCart } = this.props;
    fetchCart();
  }
  render() {
    const {
      cart
    } = this.props;
    const {
      active
    } = this.state;
    const { items, loading, error } = cart;
    if (loading) return <div>Loading...</div>;
    console.log('Cart:', cart.items);
    let cartSubtotal = 0;
    for (let i = 0; i < cart.items.length; i += 1) {
      cartSubtotal += cart.items[i].line_subtotal;
    }
    return (
      <div className={`mini-cart ${active ? 'revealed' : 'hidden'}`}>
        <div className="mini-cart-button">
          <div className="count-bubble">
            {cart.items.length}
          </div>
        </div>
        <div className="cart-dropdown">
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
                    <NavLink to="#" className="remove-button">Remove</NavLink>
                    <span className="item-subtotal">{`$${item.line_subtotal}`}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-totals">
            <div className="totals-row subtotal">
              <span className="label">Subtotal:</span>
              <span className="value">{`$${cartSubtotal}`}</span>
            </div>
          </div>
          <div className="cart-actions">
            <NavLink to="#" className="cart-action">View Cart</NavLink>
            <NavLink to="#" className="cart-action">Checkout</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({cart}) {
  return {
    cart
  };
}
export default connect(mapStateToProps, {
  fetchCart
})(MiniCart);
