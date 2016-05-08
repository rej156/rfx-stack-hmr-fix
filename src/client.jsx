import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import App from './containers/App';

const rootElement = document.getElementById('root');

render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./containers/App').default;
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      rootElement
    );
  });
}
