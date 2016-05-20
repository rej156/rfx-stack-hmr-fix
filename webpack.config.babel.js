import merge from 'webpack-merge';
import Globals from './webpack/globals';
import { getLoaders, getPreLoaders } from './webpack/loaders';

const TARGET = process.env.npm_lifecycle_event;

let Config;
let Loader = getLoaders();
const PreLoader = getPreLoaders();

if (TARGET === 'server:dev') {
  Config = require('./webpack/config.client').load();
  const ConfigClientDev = require('./webpack/config.client.dev');
  Loader = merge(ConfigClientDev.loader(), Loader);
  Config = merge(ConfigClientDev.config(), Config);
}

if (TARGET === 'build:client') {
  Config = require('./webpack/config.client').load();
  const ConfigClientBuild = require('./webpack/config.client.build');
  Loader = merge(ConfigClientBuild.loader(), Loader);
  Config = merge(ConfigClientBuild.config(), Config);
}

if (TARGET === 'build:server') {
  Config = require('./webpack/config.server').load();
  const ConfigServerBuild = require('./webpack/config.server.build');
  Loader = merge(Loader, ConfigServerBuild.loader());
  Config = merge(Config, ConfigServerBuild.config());
}

// Globals
Config = merge(Globals, Config);

// Loaders
Config = merge(Config, {
  module: {
    preLoaders: [PreLoader.eslint],
    loaders: [
      Loader.jsx,
      Loader.json,
      Loader.cssGlobal,
      Loader.cssModules,
    ],
  },
});

export default Config;
