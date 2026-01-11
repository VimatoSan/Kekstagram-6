import {initValidator} from './validator.js';
import {renderErrorMessage, renderSuccessMessage, isModalShown, renderUploadError} from './alerts.js';
import {sendForm} from './api.js';

const pristine = initValidator();

let closeForm;

function createCloseFormHandler() {
  const overlay = document.querySelector('.img-upload__overlay');
  const form = document.querySelector('.img-upload__form');
  const closeButton = document.querySelector('.img-upload__cancel');
  const hashtagElement = document.querySelector('.text__hashtags');
  const descriptionElements = document.querySelector('.text__description');
  const preview = form.querySelector('.img-upload__preview img');
  const previewEffects = form.querySelectorAll('.effects__preview');
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
    pristine.reset();
    form.reset();
    preview.src = 'img/upload-default-image.jpg';
    previewEffects.forEach((effect) => {
      effect.style.backgroundImage = 'url(img/upload-default-image.jpg)';
    });

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
    const submitButton = document.querySelector('.img-upload__submit');
    submitButton.disabled = true;
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
      })
      .finally(() => {submitButton.disabled = false;});
  }
}

function onEsc(evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
}

function isImageFile(fileType) {
  return fileType === 'image/jpeg' || fileType === 'image/png';
}

function openUploader() {
  const form = document.querySelector('.img-upload__form');
  const fileChooser = form.querySelector('.img-upload__input');
  const overlay = document.querySelector('.img-upload__overlay');
  const hashtagElement = document.querySelector('.text__hashtags');
  const descriptionElements = document.querySelector('.text__description');
  const preview = form.querySelector('.img-upload__preview img');
  const file = fileChooser.files[0];
  const previewEffects = form.querySelectorAll('.effects__preview');
  if (!isImageFile(file.type)) {
    renderUploadError('Не подходящий тип файла');
    return;
  }
  const imageUrl = URL.createObjectURL(file);
  preview.src = URL.createObjectURL(file);
  previewEffects.forEach((effect) => {
    effect.style.backgroundImage = `url(${imageUrl})`;
  });
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
