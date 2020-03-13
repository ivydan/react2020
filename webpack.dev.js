const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        compress: true,
        port: 9008,
    },
});