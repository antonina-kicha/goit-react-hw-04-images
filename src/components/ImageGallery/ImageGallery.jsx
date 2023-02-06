import PropTypes from 'prop-types';

import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'
import { ImageGalleryList, Error } from './ImageGallery.styled'

export const ImageGallery = ({images, error, openModal}) => {

    return (
      <div>
        {
          images.length > 0 && (
          <ImageGalleryList>
          {images.map((image) => (
            <ImageGalleryItem key={image.id} image={image} openModal={openModal}></ImageGalleryItem>
          ))}
          </ImageGalleryList> 
          )}
        {error && <Error>{error}</Error>}
      </div>     
    )
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  error: PropTypes.string,
  openModal: PropTypes.func.isRequired,
}
