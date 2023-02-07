import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalContainer, Overlay } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageInfo, closeModal }) => {

  const handleKeyDown = evt => {
          console.log(evt);

      if (evt.code === 'Escape') {
        closeModal();
        window.removeEventListener('keydown', handleKeyDown);
      }
  }
  
  window.addEventListener('keydown', handleKeyDown);

  const handleBackdropClick = evt => {
    console.log(evt);
    if (evt.currentTarget === evt.target) {
      closeModal();
      window.removeEventListener('keydown', handleKeyDown)
      }
  }

 return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer><img src={largeImageInfo[0]} alt={largeImageInfo[1]} />
      </ModalContainer>
    </Overlay>,
    modalRoot,
  );
}

 Modal.propTypes = {
    largeImageInfo: PropTypes.array,
    closeModal: PropTypes.func.isRequired,

  }

