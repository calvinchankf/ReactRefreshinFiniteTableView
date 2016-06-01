var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var port = process.env.PORT || 3000 ;
var app = express();

var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var compiler = webpack(webpackConfig);
var middleware = webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.use(express.static(__dirname + '/dist'));
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
