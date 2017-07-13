import express from 'express';
import webpack from 'webpack';
import { isDebug } from '../config/app';
import initExpress from './init/express';
import initStarwardRoutes from './init/starward';
import initApiRoutes from './init/api';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';

const app = express();

if (isDebug) {
  const webpackDevConfig = require('../webpack/webpack.config.dev-client');

  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Bootstrap application settings
 */

initExpress(app);

/*
 * Starward Setup
 */

initStarwardRoutes(app);

/*
 * UNCOMMENT if you add any custom GraphQL endpoints
 */

// initApiRoutes(app);

/*
 * UNCOMMENT if you need additional Express routes
 */

// initRoutes(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
app.get('*', renderMiddleware);

app.listen(app.get('port'));
