var path = require('path');
var webpack = require('webpack');

var commonConfig = require('./common.config');
var appConfig = require('./webpack.config.prod-app');
var commonLoaders = commonConfig.commonLoaders;
var externals = commonConfig.externals;
var distPath = commonConfig.output.distPath;
var publicPath = commonConfig.output.publicPath;

module.exports = [
  appConfig, {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'app'),
    entry: {
      server: '../server/index'
    },
    target: 'node',
    node: {
      __dirname: false
    },
    devtool: 'sourcemap',
    output: {
      // The output directory as absolute path
      path: distPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: 'server.js',
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: 'commonjs2'
    },
    module: {
      loaders: commonLoaders.concat({
          test: /\.css$/,
          loader: 'css/locals?modules&importLoaders=1'
      })
    },
    resolve: {
      root: [path.join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css']
    },
    externals: externals,
    plugins: [
        // Order the modules and chunks by occurrence.
        // This saves space, because often referenced modules
        // and chunks get smaller ids.
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.IgnorePlugin(/vertx/),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false
          }
        }),
        new webpack.BannerPlugin(
          'require("source-map-support").install();',
          { raw: true, entryOnly: false }
        )
    ],
  }
];
