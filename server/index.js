import express from 'express';
import webpack from 'webpack';
import { isDebug } from '../app/config/app';
import initExpress from './init/express';
import initStarwardRoutes from './init/api';
// import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';

const app = express();

if (isDebug) {
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');

  const devBrowserConfig = webpackConfig({ browser: true });
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
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
