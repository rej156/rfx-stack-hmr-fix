import path from 'path';
import isDev from 'isdev';
import routes from '~/src/routes';
import { Dir } from '~/config';
import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { setMatchMediaConfig } from 'local-reflex-matchmedia';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContextProvider from '~/src/context/ContextProvider';
import initStore from '~/src/state';

import {
  dehydrate,
  fetchData,
} from 'local-reflex-react';

function handleRouter(req, res, props) {
  const { components, params, location } = props;
  const index = path.join(Dir.src, 'index');

  const store = initStore({
    app: { ssrLocation: req.url },
    ui: { mui: { userAgent: req.headers['user-agent'] } },
  });

  fetchData(store, components, params, location.query)
    .then(() => setMatchMediaConfig(req))
    .then(() => renderToString(
      <MuiThemeProvider muiTheme={store.ui.getMui()}>
        <ContextProvider context={{ store }}>
          <RouterContext {...props} />
        </ContextProvider>
      </MuiThemeProvider>
    ))
    .then(() => console.log('d', dehydrate(store)))
    .then((html) => res
      .status(200)
      .render(index, {
        build: isDev ? null : '/build',
        head: Helmet.rewind(),
        state: dehydrate(store),
        root: html,
      }));
}

function handleRedirect(res, redirect) {
  res.redirect(302, redirect.pathname + redirect.search);
}

function handleNotFound(res) {
  res.status(404).send('Not Found');
}

function handleError(res, err) {
  res.status(500).send(err.message);
}

export function isoMiddleware(req, res) {
  match({ routes, location: req.url },
    (err, redirect, props) => {
      if (err) handleError(res, err);
      else if (redirect) handleRedirect(res, redirect);
      else if (props) handleRouter(req, res, props);
      else handleNotFound(res);
    });
}
