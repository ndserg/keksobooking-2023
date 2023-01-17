const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, `public`),
  },
  devtool: `source-map`,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    open: true,
    port: 9000,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
