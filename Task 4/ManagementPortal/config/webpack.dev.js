const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
process.env.NODE_ENV = 'development';

module.exports = webpackMerge(commonConfig(), {
        debug: true,
        module: {
            loaders: [
                {test: /\.jsx?$/, loader: 'react-hot!babel', exclude: [/node_modules/, /public/]},
            ]
        },
        devtool: 'source-map',
        devServer: {
            headers: {'Access-Control-Allow-Origin': '*'}
        }
});