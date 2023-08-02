
import { input, API_KEY,page,currentPage, per_page} from './variables.js'
import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';


export const getImageArray = async (page) => {
    const value = input.value;
    try {
        const { data } = await axios({
            params: {
                key: API_KEY,
                q: `${value}`,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: "true",
                page: page,
                per_page: 40,
            }
    });
        return data;
    } catch (error) {
        console.log(error.message);
    }
};
   