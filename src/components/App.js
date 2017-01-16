import React, { Component } from 'react';
import Header from './Common/Header';
import { Footer } from './Common/Footer';

const App = ({children, history}) => {
  const isHome = children.props.location.pathname === "/";
  return (
    <div className={isHome ? "home" : children.props.location.pathname.split('/').join(' ')}>
      <Header
        isHome={isHome}
        pathname={children.props.location.pathname}
      />
      {children}
      <Footer />
    </div>
  );
};

App.propTypes = {
  history: React.PropTypes.object.isRequired,
  children: React.PropTypes.object.isRequired,
};


export default App;
