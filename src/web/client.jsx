import React from 'react';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import { fetchDataOnLocationMatch } from '../utils/fetch';
import { rehydrate } from '~/src/shared/state/hydrate';
import initStore from '../shared/stores';
import routes from '../shared/routes';
import App from './App';

const store = rehydrate(initStore);
store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);

function renderApp(AppComponent) {
  if (window.store) {
    window.store = require('../shared/state/store')
      .default(JSON.parse(JSON.stringify(window.store)));
  }
  render(
    <AppContainer>
      <AppComponent
        store={window.store || store}
        routes={routes}
        history={browserHistory}
      />
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(App);

if (module.hot) {
  if (!window.store) window.store = store;
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
