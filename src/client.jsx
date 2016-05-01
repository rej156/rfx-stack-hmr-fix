import React from 'react';
import { render } from 'react-dom';
// import { rehydrate } from './state/hydrate';
import { Router, browserHistory, match } from 'react-router';
// import { ContextProvider } from './state/context';
// import ContextProvider from './containers/ContextProvider';
// import { fetchDataOnLocationMatch } from './utils/fetch';
import { rehydrate, fetchDataOnLocationMatch } from 'local-reflex-react';
import routes from './routes';
import initStore from './store';
import contextTypes from './state/types';
// import { initContextProvider } from './state/inject';
import { contextManager } from '~/src/state/ContextManager';

const store = rehydrate(initStore);
store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);
// const ContextProvider = initContextProvider(contextTypes);
const ContextProvider = contextManager.init(contextTypes);

render(
  <ContextProvider context={{ store }}>
    <Router routes={routes} history={browserHistory} />
  </ContextProvider>,
  document.getElementById('root')
);
