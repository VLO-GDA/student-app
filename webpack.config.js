var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: './js',
    publicPath: '/js/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.*css$/,
      loaders: ["style", "css", "sass"]
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.woff(\d*)\??(\d*)$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf\??(\d*)$/,
      loader: "file-loader"
    }, {
      test: /\.eot\??(\d*)$/,
      loader: "file-loader"
    }, {
      test: /\.svg\??(\d*)$/,
      loader: "file-loader"
    }]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: false,
      cache: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ];
} else {
  module.exports.devtool = '#source-map';
}
