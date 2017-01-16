import React, { Component } from 'react';
import Header from './Common/Header';
import { Footer } from './Common/Footer';

const App = ({children, history}) => {
  return (
    <div className="container">
      <Header
        isHome={children.props.location.pathname === "/"}
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
