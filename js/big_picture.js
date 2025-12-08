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

function createPictureClickHandler(postDataList) {
  const picturesContainer = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');
  const img = bigPicture.querySelector('.big-picture__img img');
  const likes = bigPicture.querySelector('.social__likes .likes-count');
  const description = bigPicture.querySelector('.social__header .social__caption');
  const comments = bigPicture.querySelector('.social__comments');
  const visibleCommentsCount = bigPicture.querySelector('.social__comment-count');
  const commentsCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const body = document.querySelector('body');
  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      bigPicture.classList.remove('hidden');
      img.src = evt.target.src;
      let id = Number(picture.dataset.id);
      const postData = postDataList[--id];
      likes.textContent = postData.likes;
      commentsCount.textContent = postData.comments.length;
      const commentsListFragment = document.createDocumentFragment();
      postData.comments.forEach((comment) => {commentsListFragment.append(createComment(comment));});
      description.textContent = postData.description;
      comments.innerHTML = '';
      comments.append(commentsListFragment);

      commentsLoader.classList.add('hidden');
      visibleCommentsCount.classList.add('hidden');
      body.classList.add('modal-open');
    }
  });
  const closeButton = bigPicture.querySelector('.big-picture__cancel');

  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
    }
  });
}

export {createPictureClickHandler};
