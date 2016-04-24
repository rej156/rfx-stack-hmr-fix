import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';

// components
import Modal from 'react-modal';
import { Fieldset, Field, createValue } from 'react-forms';

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
  dispatch('ui.toggleModal', 'close');
};

const value = '';
const onChange = () => {
  // onChange, stores etc.
};
const schema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
};
let formValue = createValue({ schema, value, onChange });

const AuthModal = ({ open }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <h3>Login</h3>
    <Fieldset formValue={formValue}>
      <Field select="username" label="Username" />
      <Field select="password" label="Password" />
    </Fieldset>
  </Modal>
);

AuthModal.propTypes = {
  open: React.PropTypes.bool,
};

export default connect(AuthModal);
