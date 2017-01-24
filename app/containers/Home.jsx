import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomeContent } from '../components/Home/HomeContent';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';

class Home extends Component {
  render() {
    const { page, settings, loading } = this.props;
    if (loading) return <Loading />;
    if (!page) return <FourOhFour />;
    return <HomeContent {...page} siteName={settings.name} />;
  }
}

function mapStateToProps({starward, loading}) {
  const { page, settings } = starward;
  return {
    loading,
    page,
    settings
  };
}

export default connect(mapStateToProps, { })(Home);
