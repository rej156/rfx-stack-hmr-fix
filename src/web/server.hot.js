import feathers from 'feathers';
import compression from 'compression';
import ejs from 'ejs';

import { serveStaticMiddleware } from './middleware/serveStatic';
import { hotMiddleware } from './middleware/hot';
import { isoMiddleware } from './middleware/iso';
import { startWebServer as start } from '../utils/start';
import { Dir } from '~/config';

const app = feathers();

app
  .use(compression())
  .engine('ejs', ejs.renderFile)
  .set('view engine', 'ejs')
  .set('views', Dir.views)
  .configure(serveStaticMiddleware)
  .use(hotMiddleware)
  .use(isoMiddleware)
  .configure(start);
