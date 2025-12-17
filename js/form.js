import {initValidator} from './validator.js';

const pristine = initValidator();

function createCloseHandler(imgUpload) {
  const overlay = document.querySelector('.img-upload__overlay');
  const form = document.querySelector('.img-upload__form');
  const closeButton = document.querySelector('.img-upload__cancel');
  const hashtagElement = document.querySelector('.text__hashtags');
  const descriptionElements = document.querySelector('.text__description');

  function onClick() {
    close();
  }

  function onKeyDown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
    }
  }

  function close() {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    imgUpload.value = '';
    hashtagElement.value = '';
    descriptionElements.value = '';
    hashtagElement.removeEventListener('keydown', onEsc);
    descriptionElements.removeEventListener('keydown', onEsc);
    form.removeEventListener('submit', onSubmit);
    closeButton.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  closeButton.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
}

function onSubmit(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

function onEsc(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function openUploader() {
  const form = document.querySelector('.img-upload__form');
  const overlay = document.querySelector('.img-upload__overlay');
  const imgUpload = document.querySelector('.img-upload__input');
  const hashtagElement = document.querySelector('.text__hashtags');
  const descriptionElements = document.querySelector('.text__description');

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  hashtagElement.addEventListener('keydown', onEsc);
  descriptionElements.addEventListener('keydown', onEsc);
  form.addEventListener('submit', onSubmit);
  createCloseHandler(imgUpload);
}


function initImageUploader() {
  const imgUpload = document.querySelector('.img-upload__input');
  imgUpload.addEventListener('change', openUploader);
}


export {initImageUploader};
