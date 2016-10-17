'use strict';

require('dotenv').load();
const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const plugins = [
  new HtmlPlugin({
    template: `${__dirname}/app/index.html`,
  }),
  new webpack.DefinePlugin({
    __API_URL__: JSON.stringify(process.env.API_URL),
    __DEBUG__: JSON.stringify(!!process.env.DEBUG),
  }),
  new ExtractText('bundle.css'),
];

module.exports = {
  entry: `${__dirname}/app/entry.js`,
  plugins,
  devtool: production ? false : 'eval',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/build`,
  },
  sassLoader: {
    includePaths: [`${__dirname}/app/scss/lib`],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exlude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractText.extract('style', 'css!resolve-url!sass?sourceMap'),
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file?name=img/[hash].[ext]',
      },
      {
        test: /\.(svg|woff|otf|ttf|eot).*/,
        loader: 'url?limit=10000&name=font/[hash].[ext]',
      },
    ],
  },
};
