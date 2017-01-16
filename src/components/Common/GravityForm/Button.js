import React, { PropTypes } from 'react';

export const Button = props => {
  const { text, showLoading, className } = props;
  return (
    <button type="submit" className={['button', className]}>{showLoading ? 'Loading' : text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  loading: PropTypes.bool,
  className: PropTypes.string,
}
