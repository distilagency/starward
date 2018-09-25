import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchCart, fetchCartTotals, removeFromCart, updateItemQuantity } from '../actions/cart';
import { Loading } from '../components/Content/Loading';
import { CartTable } from '../components/WooCommerce/Cart/CartTable';
import './Cart.scss';

class Cart extends Component {
  componentDidMount() {
    const { fetchCart, fetchCartTotals } = this.props; // eslint-disable-line
    fetchCart();
    fetchCartTotals();
  }
  removeFromCartHandler = (event, itemKey) => {
    event.preventDefault();
    const { removeFromCart } = this.props; // eslint-disable-line
    removeFromCart(itemKey);
  }
  updateQuantityHandler = (event, itemKey, newQty) => {
    event.preventDefault();
    const { updateItemQuantity } = this.props; // eslint-disable-line
    if (newQty <= 0) removeFromCart(itemKey);
    updateItemQuantity(itemKey, newQty);
  }
  render() {
    const { cart } = this.props;
    const {
      items,
      totals,
      loadingItems,
      loadingTotals
    } = cart;
    if (loadingItems || loadingTotals) return <Loading />;
    return (
      <div className="cart">
        <div className="wrap">
          <h1>Your Cart</h1>
          <CartTable
            items={items}
            totals={totals}
            removeFromCartHandler={this.removeFromCartHandler}
            updateQuantityHandler={this.updateQuantityHandler}
          />
          <div className="cart-actions">
            <NavLink to="/checkout" className="checkout-button">Checkout</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ cart }) {
  return {
    cart
  };
}

export default connect(mapStateToProps, {
  fetchCart,
  fetchCartTotals,
  removeFromCart,
  updateItemQuantity
})(Cart);
