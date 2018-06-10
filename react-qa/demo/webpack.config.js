const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve('build'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.join(__dirname),
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      },
    ]
  }
};
