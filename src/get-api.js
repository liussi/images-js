
import { input, API_KEY,page, per_page} from './variables.js'
import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';


export const getImageArray = async (page) => {
    const value = input.value
    const URL = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
    try {
        const { data } = await axios(`${URL}`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
};
   