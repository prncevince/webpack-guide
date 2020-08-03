const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        sideEffects: true
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
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
        }
      }
    }
  }
}
