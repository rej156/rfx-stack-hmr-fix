import path from 'path';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import NpmInstallWebpackPlugin from 'npm-install-webpack-plugin';
import webpack from 'webpack';
import { Config, Dir } from '~/config';

const devhost = ['http://', Config.dev.host, ':', Config.dev.port].join('');

export function loader() {
  return {
    jsx: {
      query: {
        presets: ['es2015-loose', 'stage-0', 'react'],
        plugins: [
          'babel-root-import',
          'jsx-control-statements',
          'transform-decorators-legacy',
          'transform-class-properties',
          'transform-decorators',
          'react-hot-loader/babel',
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
      ['webpack-dev-server/client', devhost].join('?'),
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.join(Dir.web, 'client'),
    ],
    output: {
      path: '/',
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new BrowserSyncPlugin({
        host: Config.browsersync.host,
        port: Config.browsersync.port,
        proxy: devhost,
      }, { reload: false }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new NpmInstallWebpackPlugin({ save: true }),
    ],
  };
}
