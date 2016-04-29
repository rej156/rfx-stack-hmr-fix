import React, { Component } from 'react';
import { connect } from 'local-reflex-react';
// import { cx, connect, DevTools } from 'local-reflex-react';
// import isDev from 'isdev';

// components
// import { StickyContainer, Sticky } from 'react-sticky';
// import { MatchMediaProvider } from 'local-reflex-matchmedia';
// import AppBar from '../components/AppBar';
// import AppNav from '../components/AppNav';
// import AuthModal from '../components/AuthModal';

// global styles
import '../styles/_.global.css';

// module styles
// import styles from '../styles/app.layout.css';

@connect
export default
class AppLayout extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
    params: React.PropTypes.object,
    routeParams: React.PropTypes.object,
    route: React.PropTypes.object,
    routes: React.PropTypes.array,
  };

  handleAppNavRequestChange = (open) => {
    this.context.store.ui.appNavIsOpen = open;
  };

  render() {
    // const { location, params, routeParams, route, routes } = this.props;
    // const { ui, auth } = this.context.store;

    return (
      <div>TEST !!!!</div>
    );
  }
}
