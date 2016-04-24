// import React, { Component } from 'react';
// import Modal from 'react-modal';
// import { dispatch } from '../state/dispatcher';

// class ModalProvider extends Component {

//   static propTypes = {
//     children: React.PropTypes.node,
//     // content: React.PropTypes.node,
//     open: React.PropTypes.bool,
//   };

//   handleModalIsOpen = () => {
//     console.log('handleModalIsOpen');
//   };

//   handleCloseModal = () => {
//     console.log('handleCloseModal');
//     dispatch('ui.toggleModal', 'close');
//   };

//   render() {
//     return (
//       <div>
//         <div>{this.props.children}</div>
//         <Modal
//           isOpen={open}
//           onAfterOpen={this.handleModalIsOpen}
//           onRequestClose={this.handleCloseModal}
//         >
//           <h1>test</h1>
//         </Modal>
//       </div>
//     );
//   }
// }

// export { ModalProvider };
