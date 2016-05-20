import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { browserHistory, match } from 'react-router';
import initStore from '~/src/context';
import routes from '~/src/routes';

import {
  rehydrate,
  hydrateHMR,
  fetchDataOnLocationMatch,
} from 'local-rfx-react';

const rootElement = document.getElementById('root');
const store = rehydrate(initStore);
store.ui.injectTapEv(); // material-ui fix
fetchDataOnLocationMatch(browserHistory, routes, match, store);

function renderApp(_store = null) {
  const App = require('./containers/App').default;

  render(
    <AppContainer>
      <App
        context={{ store: hydrateHMR() || _store }}
        history={browserHistory}
        routes={routes}
      />
    </AppContainer>,
    rootElement
  );
}

renderApp(store);

if (module.hot) {
  if (!window.__STORE) window.__STORE = store;
  module.hot.accept('./containers/App', () => {
    renderApp();
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
