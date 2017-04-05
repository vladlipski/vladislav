global.Promise         = require('bluebird');

const webpack            = require('webpack');
const path               = require('path');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');

const publicPath         = '/public/assets';
const cssName            = 'styles.css';
const jsName             = 'bundle.js';

module.exports = function (options) {
  return {
      entry: ['babel-polyfill', './src/client.js'],
      resolve: {
          root: path.join('./', 'src'),
          modulesDirectories: ['node_modules'],
          extensions: ['', '.js', '.jsx']
      },
      plugins: [
          new webpack.DefinePlugin({
              'process.env': {
                  BROWSER:  JSON.stringify(true),
                  NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
              }
          }),
          new ExtractTextPlugin(cssName)
      ],
      output: {
          path: `./public/assets/`,
          filename: jsName,
          publicPath
      },
      module: {
          loaders: [
              {
                  test: /\.css$/,
                  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
              },
              {
                  test: /\.less$/,
                  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
              },
              {test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif'},
              {test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg'},
              {test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png'},
              {test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml'},
              {test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1'},
              {test: /\.json$/, loader: 'json-loader'}
          ]
      }
  }
};