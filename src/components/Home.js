import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initPage, getPage } from '../actions/actions_pages';
import * as Layouts from './Home/Layouts/';
import { Loading } from './Common/Content/Loading';
import { HomeContent } from './Home/HomeContent';

class Home extends Component {
  static propTypes = {
    pages: PropTypes.object,
    initPage: PropTypes.func,
    getPage: PropTypes.func,
  };
  componentWillMount(){
    this.props.initPage();
    this.props.getPage('homepage');
  }
  componentWillUnmount() {
    this.props.initPage();
  }
  render() {
    const { pages } = this.props;
    const { active_page, loading } = pages;
    if(loading){
      return <Loading />;
    }
    if(!active_page){
      return <FourOhFour />;
    }
    return <HomeContent {...active_page} />;
  }
}

const mapStateToProps = ({ pages }) => {
  return {
    pages
  };
};

export default connect(mapStateToProps, { initPage, getPage })(Home);
