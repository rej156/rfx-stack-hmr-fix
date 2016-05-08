import React, { Component } from 'react';
import { Router, browserHistory, match } from 'react-router';
import initStore, { contextTypes } from '~/src/context';
import routes from '~/src/routes';

import {
  rehydrate,
  contextManager,
  fetchDataOnLocationMatch,
} from 'local-rfx-react';

const store = rehydrate(initStore);
fetchDataOnLocationMatch(browserHistory, routes, match, store);
const ContextProvider = contextManager.init(contextTypes);

export default
class App extends Component {

  static fetchData($store) {
    $store.ui.injectTapEv(); // material-ui fix
  }

  render() {
    return (
      <ContextProvider context={{ store }}>
        <Router routes={routes} history={browserHistory} />
      </ContextProvider>
    );
  }
}
