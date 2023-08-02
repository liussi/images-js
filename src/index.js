import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { createMarkup } from "./create-markup";
import {form, gallery, loadMore, page, per_page} from './variables.js'
import { getImageArray } from "./get-api";

form.addEventListener('submit', searchByForm);
loadMore.addEventListener('click', addImageOnClickLoadMore);
loadMore.classList.add('is-hidden');

// let currentPage = 1;

// async function searchByForm(e) {
//     e.preventDefault();

//     try {
//         gallery.innerHTML = '';
//         const data = await getImageArray();
//         const searchQuery = e.target.firstElementChild.value.trim();
     

//         if (data.totalHits === 0 || searchQuery === '') {
//             return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//         }
//         gallery.innerHTML = data.hits.map(item => createMarkup(item));
//       lightbox = new SimpleLightbox('.gallery a', { 
// captionDelay : 250,
// });

        
//         Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

// const totalPages = data.totalHits / per_page;
// if (page >= totalPages) {
//     loadMore.classList.add('is-hidden');
//     return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
// }

// loadMore.classList.remove('is-hidden');
   
//     } catch(error) {
//         console.log(error);
//         gallery.innerHTML = '';
//     }


// }







// async function addImageOnClickLoadMore() {
//     try {
//         const data = await getImageArray();
//         const markup = data.hits.map(item => createMarkup(item)).join('');
//         gallery.insertAdjacentHTML('beforeend', markup);
       
//         lightbox.refresh();
      
//         const { height: cardHeight } = document
//             .querySelector(".gallery")
//             .firstElementChild.getBoundingClientRect();

//         window.scrollBy({
//             top: cardHeight * 2,
//             behavior: "smooth",
//         });
          
        
// const totalPages = data.totalHits / per_page;
//         if (page >= totalPages) {
//             loadMore.classList.add('is-hidden');
//             return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//         }
//         page += 1;
//     } catch (error) {
//         console.log(error);
//     }
// }


async function searchByForm(e) {
    e.preventDefault();

    try {
        gallery.innerHTML = '';
        const data = await getImageArray();
        const searchQuery = e.target.firstElementChild.value.trim();

        if (data.totalHits === 0 || searchQuery === '') {
            return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        gallery.innerHTML = data.hits.map(item => createMarkup(item));
                
 
        lightbox = new SimpleLightbox('.gallery a', { 
captionDelay : 250,
});
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);

        const totalPages = data.totalHits / per_page;
        if (page >= totalPages) {
            loadMore.classList.add('is-hidden');
            return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }

        loadMore.classList.remove('is-hidden');

    } catch (error) {
        console.log(error);
        gallery.innerHTML = '';
    }
     
console.log(page);
}

async function addImageOnClickLoadMore() {
    
    page += 1;
    try {
        const data = await getImageArray(page);
        const markup = data.hits.map(item => createMarkup(item)).join('');
        gallery.insertAdjacentHTML('beforeend', markup);
       
      

  lightbox.refresh();
        const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

        const totalPages = data.totalHits / per_page;
        if (page >= totalPages) {
            loadMore.classList.add('is-hidden');
            return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }

         console.log(page);

    } catch (error) {
        console.log(error);
    }
     
}

     


let lightbox = new SimpleLightbox('.gallery a', { 
captionDelay : 250,
});