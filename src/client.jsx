import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import Store from './state';
import routes from './routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ContextProvider from '~/src/context/ContextProviders';

import {
  fetchDataOnLocationMatch,
  rehydrate,
} from 'local-reflex-react';

const store = rehydrate(Store);
store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);

render(
  <MuiThemeProvider muiTheme={store.ui.getMui()}>
    <ContextProvider context={{ store }}>
      <Router routes={routes} history={browserHistory} />
    </ContextProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
