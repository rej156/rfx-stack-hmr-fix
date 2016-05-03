import React, { Component } from 'react';
import { cx, connect } from 'local-rfx-react';
// import { cx, connect, DevTools } from 'local-rfx-react';
// import isDev from 'isdev';

// components
import { MatchMediaProvider } from 'local-rfx-matchmedia';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AuthModal from '../components/AuthModal';
import AppBar from '../components/AppBar';
// import AppNav from '../components/AppNav';

// global styles
import '../styles/_.global.css';

// module styles
import styles from '../styles/app.layout.css';

@connect('store')
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

  componentWillMount() {
    // get token from localStorage
    const token = global.CLIENT
      ? window.localStorage.token
      : null;

    // auto-login with jwt
    if (token) this.context.store.auth.jwtAuth({ token });
  }

  handleAppNavRequestChange = (open) => {
    this.context.store.ui.appNavIsOpen = open;
  };

  render() {
    // const { location, params, routeParams, route, routes } = this.props;
    const { ui, auth } = this.context.store;
    // const { ui } = this.context.store;

    return (
      <MuiThemeProvider muiTheme={ui.getMui()}>
        <MatchMediaProvider breakpoints={ui.breakpoints}>
          <div className={cx({ [styles.su]: ui.layoutIsShifted })}>
            <AppBar
              open={ui.appBar.accountMenuIsOpen}
              check={auth.check}
              user={auth.user}
              ui={ui}
            />
            <div className={styles.content}>
              {this.props.children}
            </div>
          </div>
        </MatchMediaProvider>
      </MuiThemeProvider>
    );

    // return (
    //   <MuiThemeProvider muiTheme={ui.getMui()}>
    //     <MatchMediaProvider breakpoints={ui.breakpoints}>
    //       <AppNav
    //         open={ui.appNavIsOpen}
    //         docked={ui.appNavIsDocked}
    //         onRequestChange={this.handleAppNavRequestChange}
    //       >
    //         <div>NAV</div>
    //       </AppNav>
    //       <div className={cx({ [styles.su]: ui.layoutIsShifted })}>
    //         <AppBar
    //           open={ui.appBar.accountMenuIsOpen}
    //           check={auth.check}
    //           user={auth.user}
    //           ui={ui}
    //         />
    //         <div className={styles.content}>
    //           {this.props.children}
    //         </div>
    //       </div>
    //       <AuthModal
    //         open={ui.authModal.isOpen}
    //         showSection={ui.authModal.showSection}
    //         signinModel={ui.authModal.signinModel}
    //         signupModel={ui.authModal.signupModel}
    //         signinErrors={ui.authModal.signinErrors}
    //         signupErrors={ui.authModal.signupErrors}
    //       />
    //     </MatchMediaProvider>
    //   </MuiThemeProvider>
    // );
  }
}
