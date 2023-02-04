const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = (env, argv) => ({
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: argv.mode === 'development' ? 'source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      inject: 'body',
      scriptLoading: 'module'
      }),
      new FileManagerPlugin({
        events: {
          onStart: {
          delete: ['dist'],
          },
          onEnd: {
            copy: [
              {source: 'public/**/*',
              destination: 'dist',
              globOptions: {
                ignore: 'public/index.html',
              },
            },
            ],
          },
        },
      }),
  ],
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
});
