import React from 'react';
import MiniCart from '../Woocommerce/MiniCart';
import { Navigation } from './Navigation';
import { Logo } from './Logo';
import { CART_SLUG } from '../../config/app';
import './Header.scss';

export const Header = (props) => {
  const {
    siteName,
    navigation,
    currentPath
  } = props;
  return (
    <header id="banner" role="banner">
      <Logo
        siteName={siteName}
        url="/"
      />
      <div className="header-group">
        { (currentPath !== CART_SLUG) &&
          <MiniCart />
        }
        <Navigation
          items={navigation}
          currentPath={currentPath}
        />
      </div>
    </header>
  );
};
