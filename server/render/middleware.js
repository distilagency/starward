import axios from 'axios';
import React from 'react';
import { renderToString } from 'react-dom/server';
import createMemoryHistory from 'history/createMemoryHistory';
import { renderRoutes, matchRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import configureStore from '../../app/utils/configureStore';
import * as types from '../../app/actions/types';
import { baseURL } from '../../app/config/app';
import pageRenderer from './pageRenderer';
import fetchDataForRoute from '../../app/utils/fetchDataForRoute';
import routes from '../../app/routes';

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = baseURL;

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */

const render = async (req, res) => {
  try {
    const history = createMemoryHistory();
    const store = configureStore({}, history);
    if (!req.url || req.url.includes('assets') || req.url.includes('favicon')) return null;
    // Force trailing slash for SEO
    const hasTrailingSlash = req.url.match(/(\/\s*$)|(\?.*$)/g);
    if (!hasTrailingSlash) {
      res.redirect(301, req.url + '/');
      res.end();
    }
    const matchedRoutes = matchRoutes(routes, req.url);
    store.dispatch({ type: types.CREATE_REQUEST });
    const data = await fetchDataForRoute(matchedRoutes, req.query);
    const { handleNotFound } = data || {};
    const handle404 = handleNotFound === '404';
    store.dispatch({
      type: types.REQUEST_SUCCESS,
      data: {
          ...data,
          handle404,
      },
    });
    const initialState = store.getState();
    const context = {};
    // eslint-disable-next-line
    const componentHTML = renderToString(
    // eslint-disable-next-line
    <Provider store={store} key="provider">
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>,
    // eslint-disable-next-line
    );
    if (context.url) {
      return res.status(301).redirect(context.url);
    }
    const headAssets = Helmet.renderStatic();
    const finalHTML = `<!DOCTYPE html>${pageRenderer({ initialState, componentHTML, headAssets })}`;
    return res.status(handle404 ? 404 : 200).send(finalHTML);
  } catch (error) {
    console.error('renderError', error);
    return res.status(500).json(error);
  }
};

 export default render;
