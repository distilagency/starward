import React, { PropTypes } from 'react';
import moment from 'moment';

export const Footer = props => {
  return (
    <div>Copyright {moment().format('YYYY')}</div>
  );
};
