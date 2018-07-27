import React from 'react';
import './FourOhFour.scss';

export const FourOhFour = () => {
  const message = "Sorry, we couldn't find that page!";
  return (
    <section className="four-oh-four">
      <div className="message">{message}</div>
    </section>
  );
};
