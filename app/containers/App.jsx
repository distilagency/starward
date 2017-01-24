import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from '../components/Common/Header';
import { Footer } from '../components/Common/Footer';

class App extends Component {
  render() {
    const { children, starward, location } = this.props;
    const { settings, headerMenu, footerMenu } = starward;
    return (
      <div>
        <Header
          siteName={settings.name}
          navigation={headerMenu.items}
          currentPath={location.pathname}
        />
        {children}
        <Footer
          siteName={settings.name}
          navigation={footerMenu.items}
          currentPath={location.pathname}
        />
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
