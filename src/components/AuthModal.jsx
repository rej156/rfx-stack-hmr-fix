import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';
import cx from 'classnames';

// components
import Modal from 'react-modal';

// styles
const styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    border: 0,
    padding: 0,
    maxWidth: '500px',
    maxHeight: '500px',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

const handleCloseModal = () =>
  dispatch('ui.authModal.toggle', 'close');

const handleShowSigninSection = () =>
  dispatch('ui.authModal.toggleSection', 'signin');

const handleShowSignupSection = () =>
  dispatch('ui.authModal.toggleSection', 'signup');

const handleOnChangeUsername = (e) =>
  dispatch('ui.authModal.updateFields', {
    email: e.target.value,
  });

const handleOnChangePassword = (e) =>
  dispatch('ui.authModal.updateFields', {
    password: e.target.value,
  });

const handleOnSubmitFormLogin = () =>
  dispatch('auth.login');

const handleOnSubmitFormRegister = () =>
  dispatch('auth.register');

const AuthModal = ({ open, showSection, signinModel, signupModel, signinErrors, signupErrors }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <ul>
      <li><a onClick={handleShowSigninSection}>Login</a></li>
      <li><a onClick={handleShowSignupSection}>Register</a></li>
    </ul>
    <div className={cx('center', 'fit', 'col-8', 'px2', 'mx-auto',
      { hide: showSection !== 'signin' })}
    >
      <h3>Login</h3>
      <form onSubmit={handleOnSubmitFormLogin}>
        <input
          className="field rounded fit mb1 p1"
          name="email"
          onChange={handleOnChangeUsername}
          value={signinModel.email}
        />
        <input
          className="field rounded fit mb1 p1"
          name="password"
          onChange={handleOnChangePassword}
          value={signinModel.password}
        />
        <div><button type="submit" className="btn btn-primary">Login</button></div>
        <div className={cx({ hide: !signinErrors })}>{signinErrors}</div>
      </form>
    </div>
    <div className={cx('center', 'fit', 'col-8', 'px2', 'mx-auto',
      { hide: showSection !== 'signup' })}
    >
      <h3>Register</h3>
      <form onSubmit={handleOnSubmitFormRegister}>
        <input
          className="field rounded fit mb1 p1"
          name="email"
          onChange={handleOnChangeUsername}
          value={signupModel.email}
        />
        <input
          className="field rounded fit mb1 p1"
          name="password"
          onChange={handleOnChangePassword}
          value={signupModel.password}
        />
        <div><button type="submit" className="btn btn-primary">Register</button></div>
        <div className={cx({ hide: !signupErrors })}>{signupErrors}</div>
      </form>
    </div>
  </Modal>
);

AuthModal.propTypes = {
  open: React.PropTypes.bool,
  showSection: React.PropTypes.sring,
  signinModel: React.PropTypes.object,
  signupModel: React.PropTypes.object,
  signinErrors: React.PropTypes.string,
  signupErrors: React.PropTypes.string,
};

export default connect(AuthModal);
