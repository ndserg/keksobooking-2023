const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode === 'development' ? 'development' : 'production',
  devtool: argv.mode === 'development' ? 'source-map' : false,
  entry: './src/main.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
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
    port: 8000,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
});
