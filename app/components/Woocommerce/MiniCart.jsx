import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CartItems } from './CartItems';
import { fetchCart, removeFromCart } from '../../actions/cart';
import './MiniCart.scss';

class MiniCart extends Component {
  state = {
    active: false
  };
  componentDidMount() {
    const { fetchCart } = this.props;
    fetchCart();
  }
  removeFromCartHandler = (event, itemKey) => {
    event.preventDefault();
    const { removeFromCart } = this.props;
    removeFromCart(itemKey);
  }
  toggleMiniCart = (event) => {
    event.preventDefault();
    const { active } = this.state;
    this.setState({
      active: !active
    });
  }
  render() {
    const {
      cart
    } = this.props;
    const {
      active
    } = this.state;
    const { items, loading, error } = cart;
    let cartSubtotal = 0;
    for (let i = 0; i < cart.items.length; i += 1) {
      cartSubtotal += cart.items[i].line_subtotal;
    }
    return (
      <div className="mini-cart">
        <NavLink to="#" className="mini-cart-button" onClick={event => this.toggleMiniCart(event)}>
          { items.length > 0 &&
            <div className="count-bubble">
              {items.length}
            </div>
          }
        </NavLink>
        <div className={`cart-dropdown ${(active) ? 'active' : ''}`}>
          <CartItems
            items={items}
            removeFromCartHandler={this.removeFromCartHandler}
          />
          <div className="cart-totals">
            <div className="totals-row subtotal">
              <span className="label">Subtotal:</span>
              <span className="value">{`$${cartSubtotal}`}</span>
            </div>
          </div>
          <div className="cart-actions">
            <NavLink to="/cart" className="cart-action">View Cart</NavLink>
            <NavLink to="/checkout" className="cart-action">Checkout</NavLink>
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
  fetchCart, removeFromCart
})(MiniCart);
