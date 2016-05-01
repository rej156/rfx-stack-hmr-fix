import { PropTypes } from 'react';

import UIStore from './stores/ui';
import AppStore from './stores/app';
import AuthStore from './stores/auth';
import PostStore from './stores/post';

/**
  Inject Inital State into Stores
 */
export default (state) => ({
  ui: new UIStore(state.ui),
  app: new AppStore(state.app),
  auth: new AuthStore(state.auth),
  post: new PostStore(state.post),
  // or add more ...
  // user: new UserStore(state.user),
});

/**
  ContextTypes for ContextProvider
 */
export const contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  muiTheme: PropTypes.object,
  // or add more ...
  // state: PropTypes.object,
  // cache: PropTypes.object,
};
