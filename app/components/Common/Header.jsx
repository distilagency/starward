import React, { Component } from 'react';
import MiniCart from '../WooCommerce/MiniCart/MiniCart';
import { Navigation } from './Navigation';
import { Logo } from './Logo';
import { CART_SLUG } from '../../config/app';
import './Header.scss';

export default class Header extends Component {
  state = {
    miniCartOpen: false
  };
  toggleMiniCart = (event) => {
    event.preventDefault();
    const { miniCartOpen } = this.state;
    if (miniCartOpen) {
      this.setState({ miniCartOpen: false });
    } else {
      this.setState({ miniCartOpen: true });
    }
  }
  openMiniCart = () => {
    this.setState({ miniCartOpen: true });
  }
  closeMiniCart = () => {
    this.setState({ miniCartOpen: false });
  }
  render() {
    const {
      siteName,
      navigation,
      currentPath
    } = this.props;
    const {
      miniCartOpen
    } = this.state;
    const notAtCart = (currentPath !== `/${CART_SLUG}`);
    return (
      <header id="banner" role="banner">
        <div className="wrap">
          <Logo
            siteName={siteName}
            url="/"
          />
          <div className="header-group">
            { notAtCart &&
              <MiniCart
                active={miniCartOpen}
                openMiniCartHandler={() => this.openMiniCart()}
                toggleMiniCartHandler={event => this.toggleMiniCart(event)} />
            }
            <Navigation
              items={navigation}
              currentPath={currentPath}
            />
          </div>
        </div>
      </header>
    );
  }
}
