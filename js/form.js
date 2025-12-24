import {initValidator} from './validator.js';
import {renderErrorMessage, renderSuccessMessage, isModalShown} from './alerts.js';
import {sendForm} from './api.js';

const pristine = initValidator();

let closeForm;

function createCloseFormHandler() {
  const imgUpload = document.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const form = document.querySelector('.img-upload__form');
  const closeButton = document.querySelector('.img-upload__cancel');
  const hashtagElement = document.querySelector('.text__hashtags');
  const descriptionElements = document.querySelector('.text__description');

  function onClick() {
    close();
  }

  function onKeyDown(evt) {
    if (evt.key === 'Escape' && !isModalShown) {
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
  return close;
}

function onSubmit(evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    sendForm(formData)
      .then(() => {
        if (!closeForm) {
          closeForm = createCloseFormHandler();
        }
        closeForm();
        renderSuccessMessage();
      })
      .catch(() => {
        renderErrorMessage();
      });
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
  const hashtagElement = document.querySelector('.text__hashtags');
  const descriptionElements = document.querySelector('.text__description');

  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  hashtagElement.addEventListener('keydown', onEsc);
  descriptionElements.addEventListener('keydown', onEsc);
  form.addEventListener('submit', onSubmit);
  closeForm = createCloseFormHandler();
}


function initImageUploader() {
  const imgUpload = document.querySelector('.img-upload__input');
  imgUpload.addEventListener('change', openUploader);
}


export {initImageUploader};
