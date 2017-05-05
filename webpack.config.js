const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  context: __dirname,
  entry: {
    app: './app/index.jsx',
    vendor: [
      'react', 'react-dom', 'redux',
      'react-redux', 'redux-saga',
      'prop-types'
    ]
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].[hash].js'
  },
  resolve: {
    modules: ['node_modules', 'app']
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './static/index.html',
      filename: './index.html',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[hash].js',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    contentBase: path.resolve('public'),
    compress: true,
    stats: 'normal',
    port: 9090
  }
}

if (isProd) {
  config.plugins.push(
    new UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    })
  )
}

module.exports = config
