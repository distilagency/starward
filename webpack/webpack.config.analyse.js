var appConfig = require('./webpack.config.prod-app');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

appConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = [
  appConfig
];