import React from 'react';
import { connect } from '../state/context';
import { dispatch } from '../state/dispatcher';

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

const handleCloseModal = () => {
  console.log('handleCloseModal');
  dispatch('ui.toggleModal', 'close');
};

const AuthModal = ({ open }) => (
  <Modal
    isOpen={open}
    onRequestClose={handleCloseModal}
    style={styles}
  >
    <h1>Modal Content</h1>
    <p>Etc.</p>
  </Modal>
);

AuthModal.propTypes = {
  open: React.PropTypes.bool,
};

export default connect(AuthModal);
