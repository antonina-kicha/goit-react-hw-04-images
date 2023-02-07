import PropTypes from 'prop-types';
import {GalleryItem, Image} from './ImageGalleryItem.styled'

export const ImageGalleryItem = ({ image, openModal }) => {

  return (
    <GalleryItem>
      <Image src={image.webformatURL} alt={image.tags} id={image.id} onClick={(evt) => { openModal(evt.target.id) }} />
</GalleryItem>
  )
  
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  openModal: PropTypes.func,
}