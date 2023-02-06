import { Component } from 'react';

import { fetchImages } from 'api';

import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button'
import { Loader } from './Loader/Loader'
import {Modal} from './Modal/Modal'


export class App extends Component {
    state = {
        searchQuery: '',
        page: 1,
        loadNextPage: false,
        isLoading: false,
        images: [],
        currentImage: [],
        error: null,
        modalIsOpen: false,
    }
    
    handleSubmitForm = (value) => {
        if (value){this.setState({ searchQuery: value,  page: 1, loadNextPage: false}, () => {
            this.getImagesOnRequest();
        })
        }
        else { this.setState({ error: `Введите запрос в строку поиска`, images: [], loadNextPage: false }) }
        ;
    }

    loadMoreByButton = () => {
        const nextPage = this.state.page + 1;
        this.setState(({ page: nextPage }), () => {
            this.getImagesOnRequest(true)
        });       
    }

    loadMoreButtonView = (responceImage) => {
        this.setState({ loadNextPage: false });
        if (responceImage.length === 12) { this.setState({ loadNextPage: true }) }
    }

    openModal = (id) => {
        this.setState({ modalIsOpen: true });
        this.getLargeImageInfo(id);
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false, currentImage: [] });
    }

    getLargeImageInfo = (id) => {
        const currentImage = this.state.images.find(image => Number(image.id) === Number(id));
        const largeImageUrl = currentImage.largeImageURL;
        const imageAlt = currentImage.tags;
        this.setState({ currentImage: [largeImageUrl, imageAlt] });
    }

    async getImagesOnRequest(isLoadMore = false) {
        try {
      this.setState({ isLoading: true,  error: null});
            const responce = await fetchImages(this.state.searchQuery, this.state.page);
            const images = isLoadMore ? [...this.state.images, ...responce.hits] : responce.hits;
            this.setState(({ images }))
            if (images.length === 0) {
                this.setState({ error: `Изображение по запросу  "${this.state.searchQuery}" не найдено. Попробуйте ввести другой запрос` })
            } 
            this.loadMoreButtonView(responce.hits);
        }
        catch (e) {
            console.log(e);
      this.setState({error: 'Попробуй перезагрузить страницу, может повезет больше'})
        }
        finally {
            this.setState({ isLoading: false });
    }
    }
    
    render() {
        return (
            <>
                <GlobalStyle />
                <Searchbar onSubmit={this.handleSubmitForm} />
                <ImageGallery images={this.state.images} error={this.state.error} openModal={this.openModal} />
                {this.state.loadNextPage && (<Button onClick={this.loadMoreByButton}></Button>)}
                {this.state.isLoading && (<Loader></Loader>)}
                {this.state.modalIsOpen && (<Modal largeImageInfo={this.state.currentImage} closeModal={this.closeModal}></Modal>)}
            </>
        )
    }
}


