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
  console.log('handleCloseModal');
  dispatch('ui.authModal.toggle', 'close');
};

const handleOnChange = (formValue) => {
  console.log('onChange', formValue);
  dispatch('ui.authModal.updateFields', formValue);
};

const handleOnValidSubmit = (value) => {
  console.log('handleOnValidSubmit', value);
  // dispatch('auth.login', credentials)
};

const handleOnValid = () => {};
const handleOnInvalid = () => {
  window.alert('invalid');
};

const canSubmit = () => true;


const AuthModal = ({ open, credentials }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <h3>Login</h3>
    <Form
      onChange={handleOnChange}
      onValidSubmit={handleOnValidSubmit}
      onValid={handleOnValid}
      onInvalid={handleOnInvalid}
    >
      <input required
        ref="username"
        name="username"
        value={credentials.username}
        validations="isEmail"
        validationError="This is not a valid username"
      />
      <input required
        ref="password"
        name="password"
        value={credentials.password}
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
