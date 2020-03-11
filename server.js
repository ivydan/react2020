const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config=require('./webpack/webpack.config.middle');
const compiler =webpack(config);

// Tell express to use the wepack-dev-middleware and use the wepack.config.js
// configuration file as a base

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

// server the files on part 3000

app.listen(9008, function(){
    console.log("App listening on port 9008");
})
