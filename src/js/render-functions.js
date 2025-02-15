export function renderImages(images, lightbox) {
  const newList = images
    .map(image => {
      return `<li class="gallery-item">
       <a href="${image.largeImageURL}" class="gallery-link"> <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-img" width="360" height="152"/></a>
        <ul class="info-list">
          <li class="info-item">
            <h4 class="info-title">Likes</h4>
            <p class="info-text">${image.likes}</p>
          </li>
          <li class="info-item">
            <h4 class="info-title">Views</h4>
            <p class="info-text">${image.views}</p>
          </li>
          <li class="info-item">
            <h4 class="info-title">Comments</h4>
            <p class="info-text">${image.comments}</p>
          </li>
          <li class="info-item">
            <h4 class="info-title">Downloads</h4>
            <p class="info-text">${image.downloads}</p>
          </li>
        </ul>
      </li>`;
    })
    .join('');
  const list = document.querySelector('.gallery-list');
  list.innerHTML = '';
  list.insertAdjacentHTML('beforeend', newList);
  lightbox.refresh();
}
