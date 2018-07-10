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
import { REDIS_PREFIX } from '../config/app';
import pageRenderer from './pageRenderer';
import fetchDataForRoute from '../../app/utils/fetchDataForRoute';
import fetchDataForApp from '../../app/utils/fetchDataForApp';
import { redisConfig, createRedisClient } from '../redis';
import { environment } from '../utility';
import routes from '../../app/routes';

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = baseURL;

// you must set the redis prefix if you want to use redis
if (environment.isRedisEnabled && !REDIS_PREFIX) {
  throw new Error('REDIS_PREFIX needs to be configured in app.js for redis to work');
}
// create redis client
const redisClient = createRedisClient(REDIS_PREFIX);

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */

 export default function render(req, res) {
   const history = createMemoryHistory();
   const store = configureStore({}, history);
   if (!req.url || req.url.includes('assets') || req.url.includes('favicon')) return null;
   const matchedRoutes = matchRoutes(routes, req.url);
   // console.log('matchedRoutes', matchedRoutes);
   store.dispatch({ type: types.CREATE_REQUEST });
   return fetchDataForRoute(matchedRoutes, req.query)
   .then((data) => {
     store.dispatch({ type: types.REQUEST_SUCCESS, data });
     const initialState = store.getState();
     const context = {};
     const componentHTML = renderToString(
       <Provider store={store} key="provider">
         <StaticRouter location={req.url} context={context}>
           {renderRoutes(routes)}
         </StaticRouter>
       </Provider>,
     );
     if (context.url) {
       return res.status(301).redirect(context.url);
     }
     const headAssets = Helmet.renderStatic();
     const finalHTML = `<!DOCTYPE html>${pageRenderer({ initialState, componentHTML, headAssets })}`;
     return res.status(200).send(finalHTML);
   })
   .catch((err) => {
     console.error('renderError', err);
     res.status(500).json(err);
   });
 }
