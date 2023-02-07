import { fetchImages } from 'api';

import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'
import {Modal} from './Modal/Modal'
import { useState, useEffect } from 'react';

export const App = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [loadNextPage, setLoadNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState([]);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleSubmitForm = (value) => {
        if (value) {
            setSearchQuery(value);
            setPage(1);
        }
        else {
            setError(`Введите запрос в строку поиска`);
            setImages([]);
        }
            setLoadNextPage(false);
    }

    const loadMoreByButton = () => {
        setPage(() => page + 1);
    }

    const loadMoreButtonView = (responceImage) => {
        setLoadNextPage(responceImage.length === 12);
    }

    const openModal = (id) => {
        setModalIsOpen(true);
        getLargeImageInfo(id);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentImage([]);
    }

    const getLargeImageInfo = (id) => {
        const currentImage = images.find(image => Number(image.id) === Number(id));
        const largeImageUrl = currentImage.largeImageURL;
        const imageAlt = currentImage.tags;
        setCurrentImage([largeImageUrl, imageAlt]);
    }

    useEffect(() => {
        // console.log('запускается useEffect')
        if (!searchQuery) {
            // console.log('выход из useEffect');
            return;
        }
       
        async function getImagesOnRequest() {
            try {
                setIsLoading(true);
                setError(null);
                const responce = await fetchImages(searchQuery, page);
                 if (responce.hits.length === 0) {
                     setError(`Изображение по запросу  "${searchQuery}" не найдено. Попробуйте ввести другой запрос`);
                     return;
                 }
                const imagesNew = responce.hits;
                setImages(prev => page > 1 ? [...prev, ...imagesNew] :imagesNew);
                loadMoreButtonView(responce.hits);
            }
            catch (e) {
                console.log(e);
                setError('Попробуй перезагрузить страницу, может повезет больше');
            }
            finally {
                setIsLoading(false);
            }
        };

        getImagesOnRequest();   
       
    }, [searchQuery, page, ])
  
  return (
            <>
                <GlobalStyle />
                <Searchbar onSubmit={handleSubmitForm} />
                <ImageGallery images={images} error={error} openModal={openModal} />
                {loadNextPage && (<Button onClick={loadMoreByButton}></Button>)}
                {isLoading && (<Loader></Loader>)}
                {modalIsOpen && (<Modal largeImageInfo={currentImage} closeModal={closeModal}></Modal>)}
            </>
        )
}





