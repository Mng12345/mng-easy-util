const path = require('path')

module.exports = {
  mode: 'development',
  entry: './test/test.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '.'),
    },
    port: 8080,
  },
}
