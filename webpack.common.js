const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')
require('dotenv').config()

module.exports = {
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'css-loader'
        ],
        sideEffects: true
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
          emitWarning: true,
          fix: true
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      defaults: true
    })
  ],
  optimization: {
    // v5 sets usedExports to true by default
    usedExports: true,
    // moduleIds: 'deterministic', // webpack v5
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        style: {
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          name: 'styles'
        }
      }
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.PUBLIC_PATH
  }
}
