import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { createMarkup } from "./create-markup";
import {form, gallery, loadMore, per_page, currentPage} from './variables.js';
import { getImageArray } from "./get-api";

form.addEventListener('submit', searchByForm);
loadMore.addEventListener('click', addImageOnClickLoadMore);
loadMore.classList.add('is-hidden');


async function searchByForm(e) {

    e.preventDefault();
    currentPage = 1;

    try {
        gallery.innerHTML = '';
        const data = await getImageArray();
        const searchQuery = e.target.firstElementChild.value.trim();

        if (data.totalHits === 0 || searchQuery === '') {
            loadMore.classList.add('is-hidden');
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }

        gallery.innerHTML = data.hits.map(item => createMarkup(item));
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        loadMore.classList.remove('is-hidden');

    } catch (error) {
        console.log(error);
        gallery.innerHTML = '';
    }
     
}

async function addImageOnClickLoadMore() {
    
    currentPage += 1;

    try {
        const data = await getImageArray(currentPage);
        const markup = data.hits.map(item => createMarkup(item)).join('');
        gallery.insertAdjacentHTML('beforeend', markup);
       

  lightbox.refresh();
  createScroll();

        const totalPages = data.totalHits / per_page;
        
        if (currentPage >= totalPages) {
            loadMore.classList.add('is-hidden');
             Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }

    } catch (error) {
        console.log(error);
    }
     
}


let lightbox = new SimpleLightbox('.gallery a', { 
captionDelay : 250,
});

function createScroll() {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
});
}