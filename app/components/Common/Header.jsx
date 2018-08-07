import React from 'react';
import { Navigation } from './Navigation';
import { Logo } from './Logo';
import SearchForm from '../Search/SearchForm';
import './Header.scss';

export const Header = (props) => {
  const {
    siteName,
    navigation,
    currentPath,
    history
  } = props;
  return (
    <header id="banner" role="banner">
      <div className="wrap">
        <Logo
          siteName={siteName}
          url="/"
        />
        <SearchForm history={history} />
        <Navigation
          items={navigation}
          currentPath={currentPath}
        />
      </div>
    </header>
  );
};
