import {createPostGenerator, createCommentGenerator} from './data.js';

function main() {
  const commentGenerator = createCommentGenerator();
  const postGenerator = createPostGenerator(commentGenerator);

  const size = 25 ;
  const posts = [];
  for (let i = 1; i <= size; i++) {
    posts.push(postGenerator());
  }
}

main();
