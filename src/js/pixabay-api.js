import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const loader = document.querySelector('.loader');

export function sendRequest(q) {
  loader.style.display = 'block';
  return axios
    .get('', {
      params: {
        key: '48766292-dc6ec1cfa953245898524780f',
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      if (response.data.hits.length === 0) {
        showMessage(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return [];
      }
      return response.data.hits;
    })
    .catch(error => {
      showMessage('Sorry, an error occurred while loading');
      return [];
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}
