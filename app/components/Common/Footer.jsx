import React from 'react';
import moment from 'moment';
import Navigation from './Navigation';


// remove me
import GravityForm from '../GravityForm/Form'

export const Footer = props => {
  const { siteName } = props;
  return (
    <footer className="content-info" role="contentinfo">
      <GravityForm formId="1" />
      <p>Copyright {siteName} {moment().format('YYYY')}</p>
    </footer>
  );
};
