import pictures from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const ligtboxImg = document.querySelector('.lightbox__image');
const btnClose = document.querySelector('button[data-action="close-lightbox"]');
const btnNext = document.querySelector('button[data-action="next-lightbox"]');
const btnPrevious = document.querySelector(
  'button[data-action="previous-lightbox"]',
);
const overlay = document.querySelector('.lightbox__overlay');

gallery.insertAdjacentHTML('beforeend', makeGalleryMarkup(pictures));

gallery.addEventListener('click', onOpenModal);

btnClose.addEventListener('click', onCloseModal);

overlay.addEventListener('click', onOverlayClose);

const images = document.querySelectorAll('img.gallery__image');

btnNext.addEventListener('click', onArrowBtnsClick);
btnPrevious.addEventListener('click', onArrowBtnsClick);

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
  if (event.target.nodeName === 'IMG') {
    event.preventDefault();

    lightbox.classList.add('is-open');
  }

  ligtboxImg.src = event.target.dataset.source;
  ligtboxImg.alt = event.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeysPress);
}

function onCloseModal() {
  if (ligtboxImg.src && ligtboxImg.alt) {
    ligtboxImg.src = '';
    ligtboxImg.alt = '';
  }

  lightbox.classList.remove('is-open');

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeysPress);
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

function onArrowKeysPress(event) {
  const NEXT_ARROW_KEY_CODE = 'ArrowRight';
  const PREVIOUS_ARROW_KEY_CODE = 'ArrowLeft';

  const isNextKey = event.code === NEXT_ARROW_KEY_CODE;
  const isPreviousKey = event.code === PREVIOUS_ARROW_KEY_CODE;

  if (isNextKey) {
    onNextSwitchImg();
  }

  if (isPreviousKey) {
    onPreviousSwitchImg();
  }
}

function onNextSwitchImg() {
  for (let i = 0; i < images.length - 1; i += 1) {
    if (ligtboxImg.src === images[i].dataset.source) {
      ligtboxImg.src = images[i + 1].dataset.source;
      break;
    }
  }
}

function onPreviousSwitchImg() {
  for (let i = images.length - 1; i > 0; i -= 1) {
    if (ligtboxImg.src === images[i].dataset.source) {
      ligtboxImg.src = images[i - 1].dataset.source;
      break;
    }
  }
}

function onArrowBtnsClick(event) {
  const isNextBtn = event.target === btnNext;
  const isPreviousBtn = event.target === btnPrevious;

  if (isNextBtn) {
    onNextSwitchImg();
  }

  if (isPreviousBtn) {
    onPreviousSwitchImg();
  }
}
