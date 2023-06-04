const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: './src/main.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },

  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        {from: 'public'},
      ],
    }),
  ],

  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {loader: 'babel-loader'}
      ]
    }]
  }
};
