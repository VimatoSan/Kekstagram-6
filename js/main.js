import {initImageUploader} from './form.js';
import {loadPosts} from './api.js';
import {renderPictures} from './pictures.js';
import {renderUploadError} from './alerts.js';
import {createPictureClickHandler} from './big_picture.js';
import {showFilters} from './img_filters.js';


function main() {
  loadPosts()
    .then((posts) => {
      renderPictures(posts);
      createPictureClickHandler(posts);
      showFilters(posts);
    })
    .catch(() => {
      renderUploadError('Ошибка загрузки данных с сервера');});
  initImageUploader();
}

main();
