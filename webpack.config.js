// Webpack configuration
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/lib/components/DatePicker/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  externals: {
    react: 'react',
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s?)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      },
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Visualizer({
      filename: '../statistics.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    })
  ],
};
