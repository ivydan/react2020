const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.devserver');
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
}

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(9008, 'localhost', () => {
    console.log('dev server listening on pot 9008');
});