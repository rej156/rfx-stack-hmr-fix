import React, { Component } from 'react';
import { Router, browserHistory, match } from 'react-router';
import initStore, { contextTypes } from '~/src/context';
import routes from '~/src/routes';

import {
  rehydrate,
  contextManager,
  fetchDataOnLocationMatch,
} from 'local-rfx-react';

// get token from localStorage
const token = global.CLIENT
  ? window.localStorage.token
  : null;

if (token) console.log('token', token);

const store = rehydrate(initStore);
store.ui.injectTapEv(); // material-ui fix
if (token) store.auth.jwtAuth({ token });
fetchDataOnLocationMatch(browserHistory, routes, match, store);
const ContextProvider = contextManager.init(contextTypes);

export default
class App extends Component {

  static fetchData() {} // not working

  render() {
    return (
      <ContextProvider context={{ store }}>
        <Router routes={routes} history={browserHistory} />
      </ContextProvider>
    );
  }
}
