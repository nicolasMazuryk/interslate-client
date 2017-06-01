const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: !isProd
})

const config = {
  context: __dirname,
  entry: {
    app: './app/index.js',
    vendor: [
      'react', 'react-dom', 'redux',
      'react-redux', 'redux-saga',
      'whatwg-fetch', 'prop-types',
      'babel-polyfill', 'reselect'
    ]
  },
  output: {
    path: path.resolve('public'),
    filename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  resolve: {
    modules: ['node_modules', 'app']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass$/,
        use: extractSass.extract({
          use: [
            {loader: 'css-loader'},
            {loader: 'resolve-url-loader'},
            {loader: 'sass-loader'},
          ],
          // use style-loader in development
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
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
      filename: 'vendor.[chunkhash].js',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    extractSass
  ],
  devServer: {
    contentBase: path.resolve('public'),
    historyApiFallback: {
      index: 'index.html'
    },
    port: 9090,
    proxy: {
      '/api/v1': 'http://localhost:8082'
    }
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
