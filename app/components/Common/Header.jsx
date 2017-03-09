import React from 'react';
import Navigation from './Navigation';
import { Logo } from './Logo';
import SearchForm from '../Search/SearchForm';

export const Header = props => {
  const { siteName, navigation, currentPath } = props;
  return (
    <header id="banner" role="banner">
      <Logo
        siteName={siteName}
        url={'/'}
      />
      <SearchForm />
      <Navigation
        items={navigation}
        currentPath={currentPath}
      />
    </header>
  );
};
