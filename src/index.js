import axios from "axios";
import Notiflix from "notiflix";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const form = document.querySelector('form');
const input = document.querySelector('input');
const API_KEY = '38529296-de6c3fac31b2614a8135b6c10';
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let page = 1;
let per_page = 40;
let isAlertVisible = false;


form.addEventListener('submit', searchByForm);
loadMore.addEventListener('click', addImageOnClickLoadMore);

const getImageArray = async () => {
    const value = input.value
    const URL = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`;
    try {
        const { data } = await axios(`${URL}`);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}


function searchByForm(e) {
    e.preventDefault();
    
    // console.log(e.currentTarget.elements)
    getImageArray().then(data => {
        if (data.hits.length === 0) {
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
      
        
        gallery.innerHTML = data.hits.map(item => createMarkup(item))
        console.log(data.total)
    }
    )   
}



function createMarkup(data) {
        const { webformatURL, tags, likes, views, comments, downloads } = data;

    return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"  width = "200px"/>
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`  
    
};
        

function addImageOnClickLoadMore(data) {
    const totalPages = data.total / per_page;

    if (page > totalPages) {
         loadMore.style.display = 'none';
    return console.log('кінець!');
  }
  
  getImageArray()
  .then((data) => {
        gallery.innerHTML = data.hits.map(item => createMarkup(item))
        console.log(data.total)
        // Increase the group number
        page += 1;

      // Replace button text after first request
      if (page > 1) {
        loadMore.textContent = "Fetch more posts";
      }
    })
    .catch((error) => console.log(error));
};



