import React from 'react';
import Navigation from './Navigation';
import { Logo } from './Logo';

export const Header = props => {
  const { siteName, navigation, currentPath } = props;
  console.log('header pathname', currentPath);
  return (
    <header id="banner" role="banner">
      <Logo
        siteName={siteName}
        url={'/'}
      />
      <Navigation
        items={navigation}
        currentPath={currentPath}
      />
    </header>
  );
};
