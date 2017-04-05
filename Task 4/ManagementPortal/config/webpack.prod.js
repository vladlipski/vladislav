const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack            = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

process.env.NODE_ENV = 'production';

const plugins = [
    new CleanWebpackPlugin([ 'public/assets/' ], {
        root: './',
        verbose: true,
        dry: false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
];

module.exports = webpackMerge(commonConfig(), {
    debug: false,
    plugins,
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel', exclude: [/node_modules/, /public/] },
        ]
    },
    devtool: null
});
