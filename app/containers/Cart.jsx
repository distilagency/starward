import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { fetchCart, removeFromCart } from '../actions/cart';
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
  render() {
    const { cart } = this.props;
    const { items, loading, error } = cart;
    if (loading) return <Loading />;
    return (
      <div className="cart">
        <h1>Your Cart</h1>
        <CartTable
          items={items}
          removeFromCartHandler={this.removeFromCartHandler}
        />
      </div>
    );
  }
}

function mapStateToProps({ cart }) {
  return {
    cart
  };
}

export default connect(mapStateToProps, { fetchCart, removeFromCart })(Cart);
