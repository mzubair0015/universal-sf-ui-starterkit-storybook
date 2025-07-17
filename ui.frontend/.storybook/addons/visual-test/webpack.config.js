const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    server: './src/server.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  mode: 'production',
  externals: {
    react: 'react',
    '@storybook/manager-api': '@storybook/manager-api'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  }
}; 