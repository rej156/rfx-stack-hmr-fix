import React from 'react';
import { render } from 'react-dom';
import { rehydrate } from './state/hydrate';
import { Router, browserHistory, match } from 'react-router';
import { ContextProvider } from './state/context';
// import { fetchDataOnLocationMatch } from './utils/fetch';
import { fetchDataOnLocationMatch } from 'local-reflex-react';
import routes from './routes';

const store = rehydrate();

store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);

render(
  <ContextProvider context={{ store }}>
    <Router routes={routes} history={browserHistory} />
  </ContextProvider>,
  document.getElementById('root')
);
