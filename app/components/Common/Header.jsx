import React from 'react';
import Navigation from './Navigation';
import { Logo } from './Logo';

export const Header = props => {
  const { siteName, navigation, pathname } = props;
  return (
    <header id="banner" role="banner">
      <Logo
        siteName={siteName}
        url={'/'}
      />
      <Navigation
        items={navigation}
        currentPath={pathname}
      />
    </header>
  );
};
