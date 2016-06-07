import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { rehydrate } from '~/src/shared/state/hydrate';
import { AppContainer } from 'react-hot-loader';
import initStore from '../shared/stores';
import routes from '../shared/routes';

console.log('test'); // eslint-disable-line no-console
const store = rehydrate(initStore);

// <App store={store} routes={routes} history={browserHistory} />

function renderApp(App) {
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

renderApp(require('./App').default);

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp(require('./App').default);
  });
}
