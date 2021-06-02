const path = require('path');

const CircularDependencyPlugin = require('circular-dependency-plugin');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');


const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  target: 'web',
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? undefined : 'eval-cheap-source-map',
  output: {
    publicPath: `http://localhost:9000/static/js/`,
    filename: '[name].min.js',
    // Don't use hashes in dev mode for better performance
    chunkFilename: '[name].chunk.js',
    pathinfo: false,
  },
  entry: path.resolve(__dirname, '../src/app.js'),
  optimization: {
    /* https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15 */
    removeAvailableModules: isProduction,
    removeEmptyChunks: isProduction,
    minimizer: isProduction
      ? [
          new TerserWebpackPlugin({
            terserOptions: {
              warnings: false,
              compress: {
                comparisons: false,
              },
              parse: {},
              // Disabling mangling for local profiling
              output: {
                comments: false,
                ascii_only: true,
              },
            },
            parallel: true,
            // sourceMap: true, we don't need this in the new version
          }),
          new CssMinimizerPlugin(),
        ]
      : [],
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
      '.scss',
      '.css',
      '.svg',
      '.graphql',
      '.gql',
      '.mjs',
      '.json'
    ],
  },
  devServer: {
    host: `localhost`,
    publicPath: `http://localhost:9000/static/js/`,
    port: 9000,
    // hot: true, /* Dont delete this line. @nexus will include a conditional later */
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,POST,DELETE,PATCH',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, Accept, Authorization, X-Request-With',
      'Access-Control-Allow-Credentials': 'true',
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    // Supress the extensive stats normally printed after a dev build (since sizes are mostly useless):
    stats: {
      all: false,
      assets: false,
      chunks: false,
      builtAt: true,
      errors: true,
      errorsDetails: true,
      hash: false,
      modules: false,
      performance: false,
      reasons: false,
      timings: true,
      warnings: false,
      publicPath: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader',
      // },
      {
        test: /\.(js|tsx|ts)$/,
        include: [
          path.join(__dirname, '../src')
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackHarddiskPlugin({
      alwaysWriteToDisk: true,
    }),

    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
    }),
  ],
}