import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const loader = document.querySelector('.loader');

export async function sendRequest(q, page) {
  loader.style.display = 'block';
  try {
    const response = await axios.get('', {
      params: {
        key: '48766292-dc6ec1cfa953245898524780f',
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 39,
      },
    });
    if (response.data.hits.length === 0) {
      showMessage(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return { hits: [], totalHits: 0 };
    }
    return response.data;
  } catch {
    showMessage('Sorry, an error occurred while loading');
    return { hits: [], totalHits: 0 };
  } finally {
    loader.style.display = 'none';
  }
}
