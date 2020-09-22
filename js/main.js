import pictures from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const ligtboxImg = document.querySelector('.lightbox__image');
const btnClose = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

gallery.insertAdjacentHTML('beforeend', makeGalleryMarkup(pictures));

// const galleryItem = document.querySelectorAll('.gallery__item');

gallery.addEventListener('click', onOpenModal);

btnClose.addEventListener('click', onCloseModal);

overlay.addEventListener('click', onOverlayClose);

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

  ligtboxImg.src = event.target.dataset.source;
  ligtboxImg.alt = event.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
}

function onCloseModal() {
  if (ligtboxImg.src && ligtboxImg.alt) {
    ligtboxImg.src = '';
    ligtboxImg.alt = '';
  }
  lightbox.classList.remove('is-open');

  window.removeEventListener('keydown', onEscKeyPress);
}

function onOverlayClose(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
// const makeGallery = pictures.map(makeGalleryMarkup).join('');
// lightbox__overlay;
