import pictures from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');

gallery.insertAdjacentHTML('beforeend', makeGalleryMarkup(pictures));

// const galleryItem = document.querySelectorAll('.gallery__item');

gallery.addEventListener('click', onOpenModal);

function makeGalleryMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

function onOpenModal(event) {
  console.log(event.target.nodeName);
  if (event.target.nodeName === 'IMG') {
    event.preventDefault();

    lightbox.classList.add('is-open');
  }
}
// const makeGallery = pictures.map(makeGalleryMarkup).join('');
