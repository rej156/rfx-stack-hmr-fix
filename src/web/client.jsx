import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { fetchDataOnLocationMatch } from '../utils/fetch';
import { rehydrate } from '~/src/shared/state/hydrate';
import initStore from '../shared/stores';
import routes from '../shared/routes';

let store = rehydrate(initStore);
store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);

function renderApp(App) {
  if (window.store) {
    store = require('../shared/state/store')
      .default(JSON.parse(JSON.stringify(window.store)));
    window.store = store;
  }
  render(
    <AppContainer>
      <App
        store={store}
        routes={routes}
        history={browserHistory}
      />
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(require('./App').default, store);

if (module.hot) {
  if (!window.store) window.store = store;
  module.hot.accept('./App', () => {
    renderApp(require('./App').default);
  });
}
