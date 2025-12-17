import {MAX_DESCRIPTION_LENGTH, MAX_HASHTAGS_COUNT, HASHTAG_REGEXP} from './constants.js';

const pristine = new Pristine(document.querySelector('.img-upload__form'), {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__error',
});

function validateHashtag(value) {
  if (value === '') {
    return true;
  }
  const hashtags = value.toLowerCase().trim().split(/\s+/);
  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    pristine.errorText = `Число хэштегов не должно превышать ${MAX_HASHTAGS_COUNT}`;
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (!HASHTAG_REGEXP.test(hashtag)) {
      if (hashtag[0] !== '#') {
        pristine.errorText = 'Хэштеги должны начинаться с символа "#"';
      }
      else if (hashtag.length === 1 && hashtag[0] === '#') {
        pristine.errorText = 'Хэштег не может состоять только из символа "#"';
      }
      else if (hashtag.length > 20) {
        pristine.errorText = 'Длина хэштега не должна превышать 20 символов';
      }
      else {
        pristine.errorText = 'Хэштег должен содержать только буквы и числа и не может содержать пробелы, спецсимволы';
      }
      return false;
    }
    if (hashtags.indexOf(hashtag) !== i) {
      pristine.errorText = 'Хэштеги не должны повторятся';
      return false;
    }
  }
  return true;
}

function validateDescription(value) {
  return value.length >= 0 && value.length <= MAX_DESCRIPTION_LENGTH;
}

function initValidator() {
  const hashtagElement = document.querySelector('.text__hashtags');
  const descriptionElement = document.querySelector('.text__description');

  const descriptionError = `Длина комментария не должна превышать ${MAX_DESCRIPTION_LENGTH} символов`;
  pristine.addValidator(hashtagElement, validateHashtag, () => pristine.errorText);
  pristine.addValidator(descriptionElement, validateDescription, descriptionError);
  return pristine;
}
export {initValidator};

