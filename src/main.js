import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

import { sendRequest } from './js/pixabay-api';
import { renderImages } from './js/render-functions';

import iconX from './img/x.svg';
import bell from './img/bell.svg';

const form = document.querySelector('.js-form');
const input = document.querySelector('#input');
const galleryList = document.querySelector('.gallery-list');
const showMoreBtn = document.querySelector('.show-more');
const loaderBottom = document.querySelector('.loader-bottom');

let lightbox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

let page = 1;
let totalFindHits = 0;
let query = '';
let maksPages = 0;

form.addEventListener('submit', submitForm);
showMoreBtn.addEventListener('click', loadNextPage);
input.addEventListener('focus', () => (input.style.borderColor = '#4e75ff'));
input.addEventListener('blur', () => (input.style.borderColor = ''));

function submitForm(event) {
  event.preventDefault();
  query = input.value.trim();
  page = 1;
  showMoreBtn.style.display = 'none';
  if (!query) {
    showMessage('Please enter the text');
    form.reset();
    showMoreBtn.style.display = 'none';
    query = input.value.trim();
    page = 1;
    galleryList.innerHTML = '';
    return;
  }
  sendRequest(query, page)
    .then(data => {
      galleryList.innerHTML = '';
      renderImages(data.hits, lightbox);
      maksPages = Math.ceil(data.totalHits / 40);
      totalFindHits = data.totalHits;
      form.reset();
      showMoreBtn.style.display = maksPages < 2 ? 'none' : 'block';
    })
    .catch(() => {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      galleryList.innerHTML = '';
      showMoreBtn.style.display = 'none';
      form.reset();
    });
}

function loadNextPage() {
  loaderBottom.style.display = 'block';
  showMoreBtn.style.display = 'none';
  page += 1;

  sendRequest(query, page)
    .then(data => {
      renderImages(data.hits, lightbox);
      maksPages = Math.ceil(data.totalHits / 40);
      if (page >= maksPages) {
        showMessageBell(
          "We're sorry, but you've reached the end of search results"
        );
        showMoreBtn.style.display = 'none';
      } else {
        showMoreBtn.style.display = 'block';
      }
      const galleryItem = document.querySelector('.gallery-list .gallery-item');
      if (galleryItem) {
        const cardHeight = galleryItem.getBoundingClientRect().height || 0;
        window.scrollBy({
          top: cardHeight * 3 - 10,
          behavior: 'smooth',
        });
      }
    })
    .catch(() => {
      showMessage('Sorry, an error occurred while loading');
    })
    .finally(() => {
      loaderBottom.style.display = 'none';
    });
}

function showMessage(message) {
  iziToast.show({
    message,
    position: 'topRight',
    iconUrl: iconX,
    backgroundColor: '#ef4040',
    titleColor: '#fff',
    messageColor: '#fff',
    progressBarColor: '#b51b1b',
    theme: 'dark',
    displayMode: 2,
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutLeft',
    maxWidth: '350px',
    timeout: 3000,
  });
}

function showMessageBell(message) {
  iziToast.show({
    message,
    position: 'topRight',
    iconUrl: bell,
    backgroundColor: '#6c8cff',
    titleColor: '#fff',
    messageColor: '#fff',
    progressBarColor: '#4e75ff',
    theme: 'dark',
    displayMode: 2,
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutLeft',
    maxWidth: '350px',
    timeout: 3000,
  });
}
