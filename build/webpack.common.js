const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distPath = path.join(__dirname, '../dist');
const indexHtml = 'index.html';

module.exports = {
  devtool: 'source-map',
  entry: './src/index.tsx',
  output: {
    filename: '[name].bundle.js',
    path: distPath,
  },
  devServer: {
    contentBase: distPath,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            noEmit: false,
          },
        },
      },
      { enforce: 'pre', test: /\.ts$/, loader: 'source-map-loader' },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: './static/index.template.ejs',
    }),
  ],
};
