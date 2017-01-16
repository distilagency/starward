import React, { PropTypes } from 'react';

export const IntroSection = props => {
  const { title, subtitle } = props;
  return (
    <header>
      <div className="wrap">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </header>
  );
};

IntroSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
