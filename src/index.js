import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



axios.defaults.baseURL = 'https://pixabay.com/api/';

const form = document.querySelector('form');
const input = document.querySelector('input');
const API_KEY = '38529296-de6c3fac31b2614a8135b6c10';
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
let  page = 1;
let per_page = 40;
let isAlertVisible = false;


form.addEventListener('submit', searchByForm);
loadMore.addEventListener('click', addImageOnClickLoadMore);
loadMore.classList.add('is-hidden');

const getImageArray = async () => {
    const value = input.value
    const URL = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`;
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
      loadMore.classList.remove('is-hidden');
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits } images.`);
      

    }
    )   
}



function createMarkup(data) {
        const { largeImageURL ,webformatURL, tags, likes, views, comments, downloads } = data;

  return ` <a href="${largeImageURL}" > <div class="photo-card">

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
</div>
</a>
   
     `
    
};

function addImageOnClickLoadMore() {
    getImageArray()
      .then((data) => {
          const markup = data.hits.map(item => createMarkup(item)).join('');
        gallery.insertAdjacentHTML('beforeend', markup);
          console.log(data.totalHits);
          
          const totalPages = data.totalHits / per_page;
          if (page >= totalPages) {
            loadMore.classList.add('is-hidden');
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
          }
          page += 1;
        })
        .catch((error) => console.log(error));
}

let lightbox = new SimpleLightbox('.gallery a', { 
    captionsData: 'alt',
    captionDelay : 250,
 });


