import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';
import cx from 'classnames';

// components
import Modal from 'react-modal';

// styles
const btnGrp = cx(['btn', 'left', 'x-group-item']);

const styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    border: 0,
    padding: 0,
    maxWidth: '350px',
    maxHeight: '350px',
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

const handleOnSubmitFormLogin = () => {
  const result = dispatch('auth.login');
  console.log('result', result);
};

const handleOnSubmitFormRegister = () => {
  dispatch('auth.register');
};

const AuthModal = ({ open, showSection, signinModel, signupModel, signinErrors, signupErrors }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <div className="center m3">
      <div className="inline-block clearfix blue">
        <button
          onClick={handleShowSigninSection}
          className={cx(btnGrp, 'rounded-left', {
            'btn-primary': showSection === 'signin',
            'btn-outline': showSection !== 'signin',
          })}
        >Login</button>
        <button
          onClick={handleShowSignupSection}
          className={cx(btnGrp, 'rounded-right', {
            'btn-primary': showSection === 'signup',
            'btn-outline': showSection !== 'signup',
          })}
        >Register</button>
      </div>
    </div>

    <div className={cx('center', 'fit', 'col-8', 'px2', 'mx-auto',
      { hide: showSection !== 'signin' })}
    >
      <h3>Login</h3>
      <form onSubmit={handleOnSubmitFormLogin}>
        <input
          className="field rounded fit mb1 p1"
          name="email"
          placeholder="Email"
          onChange={handleOnChangeUsername}
          value={signinModel.email}
        />
        <input
          className="field rounded fit mb1 p1"
          name="password"
          placeholder="Password"
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
          placeholder="Email"
          onChange={handleOnChangeUsername}
          value={signupModel.email}
        />
        <input
          className="field rounded fit mb1 p1"
          name="password"
          placeholder="Password"
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
  showSection: React.PropTypes.string,
  signinModel: React.PropTypes.object,
  signupModel: React.PropTypes.object,
  signinErrors: React.PropTypes.string,
  signupErrors: React.PropTypes.string,
};

export default connect(AuthModal);
