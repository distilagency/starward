import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Header } from '../components/Common/Header';
import { Footer } from '../components/Common/Footer';
import { TrackingScript } from '../components/Common/TrackingScript';
import { addToCart } from '../actions/cart';
import { isClient } from '../config/app';
import '../sass/global/styles.scss';
import './App.scss';

// eslint-disable-next-line
class App extends Component {
  addToCartHandler = (event, productId, quantity) => {
    event.preventDefault();
    const { addToCart } = this.props; // eslint-disable-line
    addToCart(productId, quantity);
  }
  render() {
    const {
      route,
      starward,
      location,
      history
    } = this.props;
    const { settings, headerMenu } = starward;
    return (
      <div className={location.pathname === '/' ? 'home' : location.pathname.replace(/\//g, '')}>
        <Header
          siteName={settings.name}
          navigation={headerMenu && headerMenu.length > 0 ? headerMenu : []}
          currentPath={location.pathname}
          history={history}
        />
        {renderRoutes(route.routes)}
        <Footer siteName={settings.name} />
        <TrackingScript
          type={!settings.trackingType ? 'none' : settings.trackingType}
          id={!settings.trackingId ? '' : settings.trackingId}
        />
      </div>
    );
  }
}

function mapStateToProps({loading, starward, cart}) {
  return {
    loading,
    starward,
    cart
  };
}

export default connect(mapStateToProps, {})(App);
