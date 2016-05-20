import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import initStore from './context';
import routes from './routes';
import App from './containers/App';

import {
  rehydrate,
  fetchDataOnLocationMatch,
} from 'local-rfx-react';

const store = rehydrate(initStore);
store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);

function renderApp(AppComponent, hmrStore = null) {
  if (window.store) {
    hmrStore = require('./context') // eslint-disable-line no-param-reassign
      .default(JSON.parse(JSON.stringify(window.store)));
    window.store = hmrStore;
  }

  render(
    <AppContainer>
      <AppComponent
        store={hmrStore}
        routes={routes}
        history={browserHistory}
      />
    </AppContainer>,
    document.getElementById('root')
  );
}

renderApp(App, store);

if (module.hot) {
  if (!window.store) window.store = store;
  module.hot.accept('./containers/App', () => {
    renderApp(require('./containers/App').default);
  });
}

// if (module.hot) {
//   module.hot.accept('./containers/App', () => {
//     // If you use Webpack 2 in ES modules mode, you can
//     // use <App /> here rather than require() a <NextApp />.
//     const NextApp = require('./containers/App').default;
//     render(
//       <AppContainer>
//         <NextApp />
//       </AppContainer>,
//       rootElement
//     );
//   });
// }
