import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import queryString from 'query-string';
import * as types from './actions/types';
import fetchDataForRoute from './utils/fetchDataForRoute';

class ClientDataFetcher extends Component {
  componentWillReceiveProps(nextProps) {
    const navigated = nextProps.location !== this.props.location;
    const { routes, store } = nextProps;
    if (navigated) {
      const queries = queryString.parse(nextProps.location.search);
      store.dispatch({ type: types.CREATE_REQUEST });
      fetchDataForRoute(matchRoutes(routes, nextProps.location.pathname), queries)
      .then((data) => {
        return (
          store.dispatch({
            type: types.REQUEST_SUCCESS,
            gtm: types.GTM_TRACK_PAGE_CHANGE,
            data
          })
        );
      });
    }
  }

  render() {
    const { children, location } = this.props;
    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    return (
      <Route
        location={location}
        render={() => children}
      />
    );
  }
}

export default withRouter(ClientDataFetcher);
