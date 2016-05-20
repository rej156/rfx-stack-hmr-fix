import React, { Component } from 'react';
import { Router } from 'react-router';
import { contextTypes } from '~/src/context';

import {
  contextManager,
} from 'local-rfx-react';

const ContextProvider = contextManager.init(contextTypes);

export default
class App extends Component {

  static propTypes = {
    context: React.PropTypes.object,
    routes: React.PropTypes.object,
    history: React.PropTypes.object,
  };

  static fetchData() {} // not working

  render() {
    return (
      <ContextProvider context={this.props.context}>
        <Router routes={this.props.routes} history={this.props.history} />
      </ContextProvider>
    );
  }
}

// import React, { Component } from 'react';
// import { Router, browserHistory, match } from 'react-router';
// import initStore, { contextTypes } from '~/src/context';
// import routes from '~/src/routes';

// import {
//   rehydrate,
//   contextManager,
//   fetchDataOnLocationMatch,
// } from 'local-rfx-react';

// const store = rehydrate(initStore);
// store.ui.injectTapEv(); // material-ui fix

// fetchDataOnLocationMatch(browserHistory, routes, match, store);
// const ContextProvider = contextManager.init(contextTypes);

// export default
// class App extends Component {

//   static fetchData() {} // not working

//   render() {
//     return (
//       <ContextProvider context={{ store }}>
//         <Router routes={routes} history={browserHistory} />
//       </ContextProvider>
//     );
//   }
// }
