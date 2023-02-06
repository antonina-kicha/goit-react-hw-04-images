import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalContainer, Overlay } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    largeImageInfo: PropTypes.array,
    closeModal: PropTypes.func.isRequired,

  }
  componentDidMount() {
  
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }
  
  handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        this.props.closeModal();
      }
  }
  
  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
        this.props.closeModal();
      }
  }

  render() {
    return createPortal(
    <Overlay onClick={this.handleBackdropClick}>
      <ModalContainer><img src={this.props.largeImageInfo[0]} alt={this.props.largeImageInfo[1]} />
      </ModalContainer>
    </Overlay>,
    modalRoot,
  );
  }
}



