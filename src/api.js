import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const apiKEY = "31841001-51f92be338cf42306cf8849f6";
const searchParametr = 'image_type=photo&orientation=horizontal';

export const fetchImages = async (searchQuery, page) => {
    const response = await axios.get(`/?key=${apiKEY}&${searchParametr}&q=${searchQuery}&page=${page}&per_page=12`)
    return response.data;
}

