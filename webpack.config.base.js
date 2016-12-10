/*
 * Webpack 基础配置
 */
'use strict';

var webpack = require('webpack');

var PRJ_ROOT_NAME = 'crm'; // 项目发布上线url上的名称

var config = {
  getPrjRootName: function(){
    return PRJ_ROOT_NAME;
  },
  output: {
    filename: '[name].js', // Notice we use a variable
    publicPath: '/' + PRJ_ROOT_NAME + '/assets/'
  },

  entry: {
      'main': './src/components/main.js',
      'vendors': [
        'react', 'react-router', 'react-bootstrap', 'reflux', 
        'js-cookie', 'lodash', 'superagent', 'fileapi'
      ],
      'ie8': [
        'html5shiv/dist/html5shiv',
        'html5shiv/dist/html5shiv-printshiv',
        'es5-shim/es5-shim',
        'es5-shim/es5-sham'
      ]
  },

  stats: {
    colors: true,
    reasons: true
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      'images': __dirname + '/src/images',
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components',
      'stores': __dirname + '/src/stores',
      'actions': __dirname + '/src/actions',
      'utils': __dirname + '/src/utils'
    }
  },
  module: {
    // preLoaders: [{
    //   test: /\.js$/,
    //   loader: "eslint-loader",
    //   exclude: /node_modules/
    // }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, { // LESS
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|woff|woff2|otf|eot|svg|ttf)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: 'react/addons',
      ReactBS: 'react-bootstrap',
      Router: 'react-router',
      Reflux: 'reflux',
      _: 'lodash',
      moment: 'moment'
    }),
    // 公用模块的代码放到common.js中，避免重复打包
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

module.exports = config;
