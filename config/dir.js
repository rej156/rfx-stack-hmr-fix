import path from 'path';

const Dir = {
  config: path.resolve(__dirname),
  root: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '..', 'src'),
  modules: path.resolve(__dirname, '..', 'node_modules'),
  public: path.resolve(__dirname, '..', 'public'),
  build: path.resolve(__dirname, '..', 'public', 'build'),
  static: path.resolve(__dirname, '..', 'public', 'static'),
  shared: path.resolve(__dirname, '..', 'src', 'shared'),
  api: path.resolve(__dirname, '..', 'src', 'api'),
  web: path.resolve(__dirname, '..', 'src', 'web'),
  views: path.resolve(__dirname, '..', 'src', 'web', 'views'),
  utils: path.resolve(__dirname, '..', 'src', 'utils'),
  hooks: path.resolve(__dirname, '..', 'src', 'api', 'hooks'),
  middleware: path.resolve(__dirname, '..', 'src', 'api', 'middleware'),
  services: path.resolve(__dirname, '..', 'src', 'api', 'services'),
  seeds: path.resolve(__dirname, '..', 'src', 'seeds'),
};

export { Dir };
