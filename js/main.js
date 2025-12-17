import {generatePosts} from './data.js';
import {renderPictures} from './pictures.js';
import {createPictureClickHandler} from './big_picture.js';
import {initImageUploader} from './form.js';

function main() {
  const posts = generatePosts(25);
  renderPictures(posts);
  createPictureClickHandler(posts);
  initImageUploader();
}

main();
