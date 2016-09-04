var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: './dist/'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  }
}
