import feathers from 'feathers/client';
import feathersHooks from 'feathers-hooks';
import feathersLocalStorage from 'feathers-localstorage';
import feathersSocketClient from 'feathers-socketio/client';
import feathersAuth from 'feathers-authentication/client';
import socketIOClient from 'socket.io-client';

let instance = false;
const config = global.CONFIG;
const uri = ['http://', config.io.host, ':', config.io.port].join('');

export function app() {
  if (instance) return instance;

  instance = feathers()
    .configure(feathersHooks())
    .configure(feathersSocketClient(socketIOClient(uri)))
    .configure(feathersAuth({ storage: feathersLocalStorage }));

  return instance;
}

export function service(name) {
  return app().service(name);
}
