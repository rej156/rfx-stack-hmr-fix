import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '~/webpack.config.babel';
import { Config } from '~/config';

const devhost = ['http://', Config.dev.host, ':', Config.dev.port].join('');
const webhost = ['http://', Config.web.host, ':', Config.web.port].join('');

// console.log('----------------------------------------------------------------------');
// console.log('config.module.loaders', config.module.loaders);
// console.log('----------------------------------------------------------------------');

new WebpackDevServer(webpack(config), {
  proxy: { '*': webhost },
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  hot: true,
  stats: {
    colors: true,
  },
})
.listen(
    Config.dev.port,
    Config.dev.host,
  (err) => {
    if (err) console.log(err);  // eslint-disable-line no-console
    console.log(`Listening at ${devhost}`);  // eslint-disable-line no-console
  });
