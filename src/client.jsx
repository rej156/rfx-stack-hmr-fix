import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import initStore, { contextTypes } from '~/src/context';
import routes from './routes';

import {
  rehydrate,
  contextManager,
  fetchDataOnLocationMatch,
} from 'local-rfx-react';

const store = rehydrate(initStore);
store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);
const ContextProvider = contextManager.init(contextTypes);

render(
  <ContextProvider context={{ store }}>
    <Router routes={routes} history={browserHistory} />
  </ContextProvider>,
  document.getElementById('root')
);
