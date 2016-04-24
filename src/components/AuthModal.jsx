import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';

// components
import Modal from 'react-modal';
import { Form } from 'formsy-react';

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

const handleCloseModal = () => {
  dispatch('ui.authModal.toggle', 'close');
};

const handleOnValidSubmit = (credentials) => {
  console.log('handleOnValidSubmit', credentials);
  dispatch('auth.login', credentials);
};

const handleOnValid = () => console.log('valid');
const handleOnInvalid = () => console.log('invalid');

const canSubmit = () => true;

const handleOnChangeUsername = (e) => {
  dispatch('ui.authModal.updateFields', {
    username: e.target.value,
  });
};

const handleOnChangePassword = (e) => {
  dispatch('ui.authModal.updateFields', {
    password: e.target.value,
  });
};

const AuthModal = ({ open, credentials }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <h3>Login</h3>
    <Form
      onValidSubmit={handleOnValidSubmit}
      onValid={handleOnValid}
      onInvalid={handleOnInvalid}
    >
      <input required
        name="username"
        value={credentials.username}
        onChange={handleOnChangeUsername}
        validations="isEmail"
        validationError="This is not a valid username"
      />
      <input required
        name="password"
        value={credentials.password}
        onChange={handleOnChangePassword}
        validations="isAlphanumeric"
        validationError="This is not a valid password"
      />
      <button type="submit" disabled={!canSubmit}>Submit</button>
    </Form>
  </Modal>
);

AuthModal.propTypes = {
  open: React.PropTypes.bool,
  credentials: React.PropTypes.object,
};

export default connect(AuthModal);
