/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';

var webpack = require('webpack');

var baseConfig = require('./webpack.config.base');
var config = Object.create(baseConfig);
config.cache = true;
config.debug = true;
config.devtool = 'cheap-source-map';
config.entry['main'] = [
  'webpack/hot/only-dev-server', 
  './src/components/main.js'
];
config.module.loaders[0].loader = 'react-hot!babel-loader';
config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
);
config.devServer = {
  port: 8000,
  contentBase: 'http://localhost/' + baseConfig.getPrjRootName(),
  publicPath: 'http://localhost:8000/assets/',//'/assets/',
  //noInfo: true, //  --no-info option
  hot: true
};

module.exports = config;
