import React from 'react';
import MiniCart from '../Woocommerce/MiniCart';
import { Navigation } from './Navigation';
import { Logo } from './Logo';
import './Header.scss';

export const Header = (props) => {
  const {
    siteName,
    navigation,
    currentPath
  } = props;
  return (
    <header id="banner" role="banner">
      <div className="wrap">
        <Logo
          siteName={siteName}
          url="/"
        />
        <div className="header-group">
          <MiniCart />
          <Navigation
            items={navigation}
            currentPath={currentPath}
          />
        </div>
      </div>
    </header>
  );
};
