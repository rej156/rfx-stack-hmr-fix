import { Dir } from '~/config';

import compression from 'compression';
import cors from 'cors';
import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest';
import primus from 'feathers-primus';

import apiBeforeMiddleware from './middleware/api/before';
import apiAfterMiddleware from './middleware/api/after';

import auth from './auth';
import services from './services';
import { startApiServer as start } from './start';

const app = feathers()
  .configure(configuration(Dir.config, 'feathers'));

app
  .use(compression())
  .options('*', cors())
  .configure(apiBeforeMiddleware)
  .configure(hooks())
  .configure(rest())
  .configure(primus({ transformer: 'websockets' }))
  .configure(auth)
  .configure(services)
  .configure(apiAfterMiddleware)
  .configure(start);
