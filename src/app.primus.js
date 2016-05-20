import feathersClient from 'feathers/client';
import feathersHooks from 'feathers-hooks';
import feathersAuth from 'feathers-authentication/client';
import feathersPrimusClient from 'feathers-primus/client';
import emitter from 'primus-emitter';
import primus from 'primus';

let instance = false;
const config = global.CONFIG;
const storage = global.CLIENT ? window.localStorage : null;
const host = ['http://', config.io.host, ':', config.io.port].join('');

export function app() {
  if (instance) return instance;

  const Socket = primus.createSocket({
    transformer: 'websockets',
    plugin: { emitter },
  });

  instance = feathersClient()
    .configure(feathersHooks())
    .configure(feathersPrimusClient(new Socket(host)))
    .configure(feathersAuth({ storage,
      tokenKey: 'token',
      cookie: 'token',
    }));

  return instance;
}

export function service(name) {
  return app().service(name);
}
