import React from 'react';
import {
  BLOG_SLUG,
  CATEGORY_SLUG,
  AUTHOR_SLUG,
  SEARCH_SLUG
} from './config/app';
import { fetchWPData } from './fetch-data';
import App from './containers/App';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        }).catch(err => console.error(err));
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

export default [{
  component: App,
  routes: [{
    path: '/',
    name: 'Home',
    exact: true,
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Page" */ './containers/Page')),
  }, {
    path: `/${BLOG_SLUG}/page/:page`,
    name: 'Blog',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Blog" */ './containers/Blog')),
  }, {
    path: `/${BLOG_SLUG}/:post`,
    name: 'BlogPost',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "BlogPost" */ './containers/BlogPost')),
  }, {
    path: `/${BLOG_SLUG}`,
    name: 'Blog',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Blog" */ './containers/Blog')),
  }, {
    path: `/${CATEGORY_SLUG}/:slug/page/:page`,
    name: 'Category',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Category" */ './containers/Category')),
  }, {
    path: `/${CATEGORY_SLUG}/:slug`,
    name: 'Category',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Category" */ './containers/Category')),
  }, {
    path: `/${AUTHOR_SLUG}/:name/page/:page`,
    name: 'Author',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Author" */ './containers/Author')),
  }, {
    path: `/${AUTHOR_SLUG}/:name`,
    name: 'Author',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Author" */ './containers/Author')),
  }, {
    path: `/${SEARCH_SLUG}`,
    name: 'Search',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Search" */ './containers/Search')),
  }, {
    path: '*',
    name: 'Page',
    fetchData: fetchWPData,
    component: asyncComponent(() => import(/* webpackChunkName: "Page" */ './containers/Page')),
  }]
}];
