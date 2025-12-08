function createComment(commentData) {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `<img
        class="social__picture"
        src=${commentData.avatar}
        alt=${commentData.name}
        width="35" height="35">
    <p class="social__text">${commentData.message}</p>`;
  return comment;
}

function getPostData(picture, postDataList) {
  const id = Number(picture.dataset.id);
  return postDataList[id - 1];
}

function renderBigPicture(bigPicture, postData) {
  const img = bigPicture.querySelector('.big-picture__img img');
  const likes = bigPicture.querySelector('.social__likes .likes-count');
  const description = bigPicture.querySelector('.social__header .social__caption');
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const visibleCommentsCount = bigPicture.querySelector('.social__comment-count');
  const commentsCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  img.src = postData.url;
  likes.textContent = postData.likes;
  commentsCount.textContent = postData.comments.length;
  description.textContent = postData.description;

  const commentsListFragment = document.createDocumentFragment();
  postData.comments.forEach((comment) => {commentsListFragment.append(createComment(comment));});
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsListFragment);

  commentsLoader.classList.add('hidden');
  visibleCommentsCount.classList.add('hidden');

  createPictureCloseHandlers(bigPicture);
}

function createPictureCloseHandlers(bigPicture) {
  const body = document.body;
  const closeButton = bigPicture.querySelector('.big-picture__cancel');

  function onKeyDown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
    }
  }

  function onClick(evt) {
    evt.preventDefault();
    close();
  }

  function close() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    closeButton.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKeyDown);
  }

  closeButton.addEventListener('click', onClick);
  document.addEventListener('keydown', onKeyDown);
}

function createPictureClickHandler(postDataList) {
  const picturesContainer = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const body = document.body;

  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      const postData = getPostData(picture, postDataList);
      bigPicture.classList.remove('hidden');
      renderBigPicture(bigPicture, postData);
      body.classList.add('modal-open');
    }
  });
}

export {createPictureClickHandler};
