import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PageContent } from '../components/Page/PageContent';

class Page extends Component {
  render() {
    const { page, settings, loading } = this.props;
    if (loading) return <Loading />;
    if (!page) return <FourOhFour />;
    return <PageContent {...page} siteName={settings.name} />;
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

export default connect(mapStateToProps, { })(Page);
