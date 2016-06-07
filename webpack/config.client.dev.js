import path from 'path';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import NpmInstallWebpackPlugin from 'npm-install-webpack-plugin';
import webpack from 'webpack';
import { Config, Dir } from '~/config';

const webhost = ['http://', Config.web.host, ':', Config.web.port].join('');
// const devhost = ['http://', Config.dev.host, ':', Config.dev.port].join('');
// const bshost = ['http://', Config.browsersync.host, ':', Config.browsersync.port].join('');

export function loader() {
  return {
    jsx: {
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        plugins: [
          'react-hot-loader/babel',
          'babel-root-import',
          'jsx-control-statements',
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-decorators',
        ],
      },
    },
    cssModules: {
      loaders: [
        'style-loader',
        ['css-loader?modules',
        'importLoaders=1',
        'localIdentName=[name]__[local]___[hash:base64:5]']
        .join('&'),
        'postcss-loader',
      ],
    },
  };
}

export function config() {
  return {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'react-hot-loader/patch',
      // ['webpack-hot-middleware/client', webhost].join('?'),
      'webpack-hot-middleware/client',
      path.join(Dir.web, 'client'),
    ],
    output: {
      // path: path.join(Dir.public, 'build'),
      path: '/',
      publicPath: '/',
      filename: 'bundle.js',
    },
    // proxy: { '*': devhost },
    plugins: [
      new BrowserSyncPlugin({
        host: Config.browsersync.host,
        port: Config.browsersync.port,
        proxy: webhost,
      }, { reload: false }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new NpmInstallWebpackPlugin({ save: true }),
    ],
  };
}
