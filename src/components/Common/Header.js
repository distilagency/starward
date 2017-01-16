import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getMenu, getSettings } from '../../actions/actions_wp';
import Navigation from './Navigation';
import { Logo } from './Logo';

class Header extends Component {
  static propTypes = {
    pathname: PropTypes.string,
    wp: PropTypes.object,
    getMenu: PropTypes.func,
    getSettings: PropTypes.func,
  };
  componentWillMount(){
    this.props.getMenu('Header');
    this.props.getSettings();
  }
  render() {
    const { wp, pathname } = this.props;
    const { navigation, settings } = wp;
    return (
      <header id="banner" role="banner">
        <Logo site_name={settings.name} url={'/'} />
        <Navigation items={navigation} current_path={pathname} />
      </header>
    );
  }
}

const mapStateToProps = ({ wp }) => {
  return {
    wp
  };
};

export default connect(mapStateToProps, { getMenu, getSettings })(Header);
