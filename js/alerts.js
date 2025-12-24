let isModalShown = false;

function createUploadErrorElement(errorText) {
  const errorMessageElement = document.createElement('section');
  errorMessageElement.classList.add('overlay');
  errorMessageElement.innerHTML = `
   <div class='error-container'>
    <button type="button" class="cancel error-container__close">Закрыть</button>
    <p>${errorText}</p>
   </div>`;
  return errorMessageElement;
}

function renderUploadError(errorText) {
  const errorMessageElement = createUploadErrorElement(errorText);
  const closeBtn = errorMessageElement.querySelector('.error-container__close');
  function closeFunction() {
    errorMessageElement.remove();
    closeBtn.removeEventListener('click', onClick);
  }
  function onClick () {
    closeFunction();
  }
  closeBtn.addEventListener('click', onClick);
  errorMessageElement.addEventListener('click', onClick);
  document.body.appendChild(errorMessageElement);
}

function createResponseMessage(button, modalOverlay) {
  isModalShown = true;

  function close() {
    isModalShown = false;
    button.removeEventListener('click', onCLick);
    modalOverlay.removeEventListener('click', onCLick);
    document.removeEventListener('keydown', onKeydown);
    if (modalOverlay.classList.contains('error')) {
      const overlay = document.querySelector('.img-upload__overlay');
      overlay.classList.remove('hidden');
    }
    modalOverlay.remove();
  }

  function onKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
    }
  }
  function onCLick() {
    close();
  }

  button.addEventListener('click', onCLick);
  modalOverlay.addEventListener('click', onCLick);
  document.addEventListener('keydown', onKeydown);
  document.body.appendChild(modalOverlay);
}

function renderSuccessMessage() {
  const templateContent = document.querySelector('#success').content;
  const btn = templateContent.querySelector('.success__button');
  const template = templateContent.querySelector('.success');
  createResponseMessage(btn, template.cloneNode(true));
}

function renderErrorMessage() {
  const overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.add('hidden');
  const templateContent = document.querySelector('#error').content;
  const template = templateContent.querySelector('.error').cloneNode(true);
  const btn = template.querySelector('.error__button');
  createResponseMessage(btn, template);
}

export {renderUploadError, renderSuccessMessage, renderErrorMessage, isModalShown};
