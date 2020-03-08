// Webpack configuration
const path = require('path');
const isProduction = process.env.NODE_ENV === 'production';
const supportServerSide = !!process.env.SERVER_SIDE;
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
    reactDOM: 'react-dom'
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
          supportServerSide ? 'isomorphic-style-loader' : 'style-loader',
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
  }
};
