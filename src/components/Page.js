import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initPage, getPage } from '../actions/actions_pages';
import { Loading } from './Common/Content/Loading';
import { PageContent } from './Pages/PageContent';

class Home extends Component {
  static propTypes = {
    pages: PropTypes.object,
    params: PropTypes.object,
    getPage: PropTypes.func,
    initPage: PropTypes.func,
  };
  componentWillMount(){
    this.props.initPage();
    this.fetchPage(this.props.params);
  }
  componentWillReceiveProps(nextProps){
    const { params } = nextProps;
    if(this.props.params.splat != params.splat){
      this.props.initPage();
      this.fetchPage(params);
    }
  }
  componentWillUnmount() {
    this.props.initPage();
  }
  fetchPage(params){
    const { splat } = params;
    const path_array = splat.split('/');
    this.props.getPage(path_array[path_array.length - 1]);
  }

  render() {
    const { pages } = this.props;
    const { active_page, loading } = pages;
    if(loading){
      return <Loading />;
    }
    return <PageContent {...active_page} />;
  }
}

const mapStateToProps = ({ pages }) => {
  return {
    pages
  };
};

export default connect(mapStateToProps, { initPage, getPage })(Home);
