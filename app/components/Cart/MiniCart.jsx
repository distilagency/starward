import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MiniCartContent } from './MiniCartContent';
import { fetchCart, removeFromCart } from '../../actions/cart';
import './MiniCart.scss';

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.cart.items
    };
  }
  componentDidMount() {
    // eslint-disable-next-line
    const { fetchCart } = this.props;
    fetchCart();
  }
  componentDidUpdate(prevProps) {
    const { cart } = this.props;
    const { cart: prevCart } = prevProps;
    const {
      items,
      loadingItems
    } = cart;
    const {
      items: prevItems
    } = prevCart;
    if ((prevItems !== items) && !loadingItems) {
      this.setState({ items }); // eslint-disable-line
    }
  }
  removeFromCartHandler = (event, itemKey) => {
    event.preventDefault();
    const { removeFromCart } = this.props; // eslint-disable-line
    removeFromCart(itemKey);
    // Remove item from local state so it is immediately removed from frontend
    const { items } = this.state;
    const newItems = items.filter(item => item.key !== itemKey);
    this.setState({
      items: newItems
    });
  }
  render() {
    const { active, toggleMiniCartHandler } = this.props;
    const { items } = this.state;
    return (
      <div className={`mini-cart ${active ? 'active' : ''}`}>
        <Link
          to="#open-minicart"
          className="mini-cart-button"
          onClick={event => toggleMiniCartHandler(event)}>
          { items && items.length > 0 && <div className="count-bubble">{items.length}</div> }
        </Link>
        <div className="cart-dropdown">
          <MiniCartContent
            items={items}
            removeFromCartHandler={this.removeFromCartHandler}
            toggleMiniCartHandler={toggleMiniCartHandler}
          />
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
