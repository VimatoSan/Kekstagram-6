import {LOAD_COMMENTS_COUNT} from './constants.js';

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

function renderCommentCounter(visibleCount) {
  const visibleCommentsCountElement = document.querySelector('.social__comment-count');
  const totalCountElement = visibleCommentsCountElement.querySelector('.comments-count');
  visibleCommentsCountElement.innerHTML = `${visibleCount} из <span class="comments-count">${totalCountElement.textContent}</span> комментариев`;
}

function getPostData(picture, postDataList) {
  const id = Number(picture.dataset.id);
  return postDataList[id];
}

function appendComments(comments, commentsContainer) {
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {commentsListFragment.append(createComment(comment));});
  commentsContainer.append(commentsListFragment);
}

function loadComments(comments, commentsLoader, commentsContainer, visibleCount = 0) {
  const newVisibleCommentsCount = Math.min(visibleCount + LOAD_COMMENTS_COUNT, comments.length);

  if (newVisibleCommentsCount === comments.length) {
    commentsLoader.classList.add('hidden');
  }

  let uploadedComments;
  if (visibleCount !== 0) {
    uploadedComments = comments.slice(visibleCount - 1, newVisibleCommentsCount - 1);
  } else {
    uploadedComments = comments.slice(0, newVisibleCommentsCount);
  }
  appendComments(uploadedComments, commentsContainer);
  renderCommentCounter(newVisibleCommentsCount);
  return newVisibleCommentsCount;
}

function renderBigPicture(bigPicture, postData) {
  const img = bigPicture.querySelector('.big-picture__img img');
  const likes = bigPicture.querySelector('.social__likes .likes-count');
  const description = bigPicture.querySelector('.social__header .social__caption');
  const commentsContainer = bigPicture.querySelector('.social__comments');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  commentsContainer.innerHTML = '';

  img.src = postData.url;
  likes.textContent = postData.likes;
  description.textContent = postData.description;
  commentsCount.textContent = postData.comments.length;

  let visibleCommentsCount = loadComments(postData.comments, commentsLoader, commentsContainer);

  const uploadComments = () => {
    visibleCommentsCount = loadComments(postData.comments, commentsLoader, commentsContainer, visibleCommentsCount);
  };
  commentsLoader.addEventListener('click', uploadComments);
  createPictureCloseHandlers(bigPicture, uploadComments);
}

function createPictureCloseHandlers(bigPicture, commentsUpload) {
  const body = document.body;
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  const commentsLoader = bigPicture.querySelector('.comments-loader');

  function onKeyDown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      close();
    }
  }

  function onClick() {
    close();
  }

  function close() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    commentsLoader.removeEventListener('click', commentsUpload);
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
