import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { fetchCart, removeFromCart, updateItemQuantity } from '../actions/cart';
import { Loading } from '../components/Content/Loading';
import { CartTable } from '../components/Woocommerce/CartTable';
import './Cart.scss';

class Cart extends Component {
  componentDidMount() {
    const { fetchCart } = this.props;
    fetchCart();
  }
  removeFromCartHandler = (event, itemKey) => {
    event.preventDefault();
    const { removeFromCart } = this.props;
    removeFromCart(itemKey);
  }
  updateQuantityHandler = (event, itemKey, newQty) => {
    event.preventDefault();
    const { updateItemQuantity } = this.props;
    if (newQty <= 0) removeFromCart(itemKey);
    updateItemQuantity(itemKey, newQty);
  }
  render() {
    const { cart } = this.props;
    const { items, loading, error } = cart;
    if (loading) return <Loading />;
    console.log('Items @ Cart', items);
    return (
      <div className="cart">
        <div className="wrap">
          <h1>Your Cart</h1>
          <CartTable
            items={items}
            removeFromCartHandler={this.removeFromCartHandler}
            updateQuantityHandler={this.updateQuantityHandler}
          />
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
  removeFromCart,
  updateItemQuantity
})(Cart);
