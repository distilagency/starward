import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, fetchCartTotals, removeFromCart, updateItemQuantity } from '../actions/cart';
import { WP_URL, SHOP_CHECKOUT_SLUG } from '../config/app';
import { CartTable } from '../components/WooCommerce/Cart/CartTable';
import { CheckoutProgressBar } from '../components/WooCommerce/Common/CheckoutProgressBar';
import { Loading } from '../components/Content/Loading';
import './Cart.scss';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.cart.items,
      totals: props.cart.totals
    };
  }
  componentDidMount() {
    const { fetchCart, fetchCartTotals } = this.props; // eslint-disable-line
    fetchCart();
    fetchCartTotals();
  }
  componentDidUpdate(prevProps) {
    const { cart } = this.props;
    const {
      items,
      totals,
      loadingItems,
      loadingTotals
    } = cart;
    const updatingCart = loadingItems || loadingTotals;
    if (cart !== prevProps.cart) {
      if (items.length === 0 && !updatingCart) {
        // eslint-disable-next-line
        this.setState({ items });
      }
      if (items.length > 0) {
        // eslint-disable-next-line
        this.setState({ items });
      }
      if (Object.keys(totals).length > 0) {
        // eslint-disable-next-line
        this.setState({ totals });
      }
    }
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
    const {
      items,
      totals
    } = this.state;
    const { cart } = this.props;
    const {
      loadingItems,
      loadingTotals
    } = cart;
    const updatingCart = loadingItems || loadingTotals;
    const cartHasItems = items && items.length > 0;
    if (!cartHasItems && updatingCart) return <Loading />;
    if (!cartHasItems) {
      return (
        <div className="cart-overview">
          <div className="wrap">
            <h1 className="title">Your Cart</h1>
            <div className="empty-cart-container">
              <p>Your cart is currently empty.</p>
              <Link to="/" className="button light">Return to Shop</Link>
            </div>
          </div>
        </div>
      );
    }
    const checkoutStages = [
      { label: 'cart', link: false },
      { label: 'payment', link: false },
      { label: 'receipt', link: false },
    ];
    return (
      <div className="cart-overview">
        <div className="wrap">
          <h1 className="title">Your Cart</h1>
          <CheckoutProgressBar
            stages={checkoutStages}
            currentStageIndex={0} />
          <CartTable
            items={items}
            totals={totals}
            updatingItems={loadingItems}
            updatingTotals={loadingTotals}
            removeFromCartHandler={this.removeFromCartHandler}
            updateQuantityHandler={this.updateQuantityHandler}
          />
          <div className="cart-actions">
            <div className="group-left">
              <Link to="/" className="button light">Continue Shopping</Link>
            </div>
            <div className="group-right">
              <a
                href={`${WP_URL}/${SHOP_CHECKOUT_SLUG}`}
                className={`button checkout-button ${updatingCart ? 'disabled' : ''} ${items.length <= 0 ? 'hidden' : ''}`}
                onClick={updatingCart ? e => e.preventDefault() : null}>
                Checkout
              </a>
            </div>
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
