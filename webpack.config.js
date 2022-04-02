const path = require('path');
module.exports = {
  entry: './bin/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js'
  },
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}