var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, './client/dist');
var APP_DIR = path.resolve(__dirname, './client/src');

// Add indicator for whether the ReactJS app is within its DEV environment
var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        include: APP_DIR,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [devFlagPlugin]
};
