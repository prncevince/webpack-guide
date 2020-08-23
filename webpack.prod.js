const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const merged = merge(common, {
  mode: 'production',
  // devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      // chunkFilename: '[id].[contenthash].css'
    })
  ],
  output: {
    filename: '[name].[contenthash].js'
  }
})

const rules = [
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
        ]
      }
    }
  }
]

const mini = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    esModule: true
  }
}

merged.module.rules.filter(o => Boolean(o.use)).filter(o => o.use[0] === 'css-loader')[0].use.unshift(mini)
merged.module.rules = rules.concat(merged.module.rules)
module.exports = merged
