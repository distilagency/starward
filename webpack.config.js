var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'webpack/hot/dev-server', // "only" prevents reload on syntax errors
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    './src/index'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  sassLoader: {
    includePaths: [ 'assets/style/scss' ]
  },
  plugins: [
  // new webpack.DefinePlugin({
  //   'process.env': {
  //     'NODE_ENV': JSON.stringify('production')
  //   }
  // }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('assets/css/style.css',
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      include: /\.min\.js$/,
      comments: false,
      sourceMap: false
    }),
     {
      allChunks: true
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot','babel', 'eslint'],
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
          'style', // The backup style loader
          'css?sourceMap!sass?sourceMap'
      )
    },
    {
      test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
      loader : 'file-loader'
    },
    { test: /\.jpe?g$|\.gif$|\.png$|\.wav$|\.mp3$/, loader: "file-loader" }
  ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
