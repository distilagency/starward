import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MiniCartContent } from './MiniCartContent';
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
    const { cart } = this.props;
    const { active } = this.state;
    const { items } = cart;
    return (
      <div className="mini-cart">
        <NavLink to="#" className="mini-cart-button" onClick={event => this.toggleMiniCart(event)}>
          { items.length > 0 &&
            <div className="count-bubble">
              {items.length}
            </div>
          }
        </NavLink>
        <div className={`cart-dropdown ${active && 'active'}`}>
          <MiniCartContent
            items={items}
            removeFromCartHandler={this.removeFromCartHandler}
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
