import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from '../components/Common/Header';
import { Footer } from '../components/Common/Footer';

class App extends Component {
  render() {
    const { children, starward, location } = this.props;
    const { settings, headerMenu } = starward;
    return (
      <div>
        <Header
          siteName={settings.name}
          navigation={headerMenu ? headerMenu.items : []}
          currentPath={location.pathname}
        />
        {children}
        <Footer siteName={settings.name} />
      </div>
    );
  }
}

function mapStateToProps({starward, loading}) {
  return {
    loading,
    starward
  };
}

export default connect(mapStateToProps, { })(App);
