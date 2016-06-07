require('babel-core/register');
require('isomorphic-fetch');

// neded for css import on node
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});

global.CONFIG = require('./config').Config;

require('./src/api/server');
require('./src/web/server.hot');
// require('./src/web/server.iso');
// require('./src/web/server.dev');

// require((process.env.NODE_ENV === 'production')
//   ? './src/web/server.iso'
//   : './src/web/server.hot'
// );
