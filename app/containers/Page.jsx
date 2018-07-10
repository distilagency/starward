import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PageContent } from '../components/Page/PageContent';
import './Page.scss';

class Page extends Component {
  render() {
    const { page, settings, loading, handle404 } = this.props;
    if (loading) return <Loading />;
    if (!page || handle404) return <FourOhFour />;
    return <PageContent {...page} siteName={settings.name} />;
  }
}

function mapStateToProps({starward, loading}) {
  const { page, settings, handle404 } = starward;
  return {
    loading,
    page,
    settings,
    handle404
  };
}

export default connect(mapStateToProps, { })(Page);
