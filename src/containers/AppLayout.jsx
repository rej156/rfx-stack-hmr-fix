import React, { Component } from 'react';
import { connect } from '../state/context';
import cx from 'classnames';

// dev tools
import isDev from 'isdev';
import DevTools from 'mobx-react-devtools';

// components
import { StickyContainer, Sticky } from 'react-sticky';
import { MatchMediaProvider } from '../utils/MatchMediaProvider';
import AppBar from '../components/AppBar';
import AppNav from '../components/AppNav';
import AuthModal from '../components/AuthModal';

// global styles
import '../styles/_.global.css';

// module styles
import styles from '../styles/app.layout.css';

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
    const { location, params, routeParams, route, routes } = this.props;
    const ui = this.context.store.ui;

    return (
      <MatchMediaProvider breakpoints={ui.breakpoints}>
        <StickyContainer className={cx('animated', 'fadeIn')}>
          { isDev ? <DevTools /> : null }
          <AppNav
            open={ui.appNavIsOpen}
            docked={ui.appNavIsDocked}
            onRequestChange={this.handleAppNavRequestChange}
          >
            <h3 className={cx('m2')}>React Router Info</h3>
            <pre>
              <ul className={cx('list-reset', 'm2')}>
                <li><b>Location</b> {JSON.stringify(location, undefined, 2)}</li>
                <li><b>Params</b> {JSON.stringify(params, undefined, 2)}</li>
                <li><b>Route Params</b> {JSON.stringify(routeParams, undefined, 2)}</li>
                <li><b>Route</b> {JSON.stringify(route, undefined, 2)}</li>
                <li><b>Routes</b> {JSON.stringify(routes, undefined, 2)}</li>
              </ul>
            </pre>
          </AppNav>
          <div className={cx({ [styles.su]: ui.layoutIsShifted })}>
            <Sticky className={cx('animated', 'slideInDown')}>
              <AppBar open={ui.appBarMenuAccountIsOpen} />
            </Sticky>
            <div className={styles.content}>
              {this.props.children}
            </div>
          </div>
          <AuthModal open={ui.authModal.isOpen} credentials={ui.authModal.credentials} />
        </StickyContainer>
      </MatchMediaProvider>
    );
  }
}
