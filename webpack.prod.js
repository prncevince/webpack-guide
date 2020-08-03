const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ]
            ],
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production'
    })
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
    /* publicPath: 'dist/' */
  },
})
