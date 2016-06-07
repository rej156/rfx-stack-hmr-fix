import webpack from 'webpack';
import { ExposeConfigToClient } from '~/config';

export function load() {
  return {
    target: 'web',
    entry: [
      'babel-polyfill',
    ],
    plugins: [
      // new webpack.optimize.OccurenceOrderPlugin(), // Webpack 1.0
      new webpack.optimize.OccurrenceOrderPlugin(),  // Webpack 2.0 fixed this mispelling
      new webpack.DefinePlugin({
        'global.CONFIG': JSON.stringify(ExposeConfigToClient),
        'global.CLIENT': JSON.stringify(true),
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      }),
      new webpack.ProvidePlugin({
        Promise: 'bluebird',
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      }),
    ],
  };
}
