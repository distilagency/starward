import React from 'react';
import moment from 'moment';
import Navigation from './Navigation';

export const Footer = props => {
  const { siteName, navigation, pathname } = props;
  return (
    <footer className="content-info" role="contentinfo">
      <p>Copyright {siteName} {moment().format('YYYY')}</p>
      <Navigation
        items={navigation}
        currentPath={pathname}
      />
    </footer>
  );
};
