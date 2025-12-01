import {getRandomElementsFromArray, generateRandomNumber} from './utils.js';
import {
  MAX_COMMENTS,
  MAX_LIKES,
  MESSAGES,
  DESCRIPTIONS,
  MIN_LIKES,
  NAMES,
  MIN_AVATAR_ID,
  MAX_AVATAR_ID, MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT
} from './constants.js';


function createPost(id, commentGenerator) {
  const comments = [];
  const commentsCount = generateRandomNumber(0, MAX_COMMENTS);
  for (let i = 0; i < commentsCount; i++) {
    comments.push(commentGenerator());
  }
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomElementsFromArray(DESCRIPTIONS)[0],
    likes: generateRandomNumber(MIN_LIKES, MAX_LIKES),
    comments
  };
}

function createPostGenerator(commentGenerator) {
  let lastGeneratedId = 1;
  return function () {
    return createPost(lastGeneratedId++, commentGenerator);
  };
}

function createComment(id) {
  const avatarId = generateRandomNumber(MIN_AVATAR_ID, MAX_AVATAR_ID);
  const messagesCount = generateRandomNumber(MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT);
  return {
    id,
    avatar: `img/avatar-${avatarId}.svg`,
    name: getRandomElementsFromArray(NAMES)[0],
    message: getRandomElementsFromArray(MESSAGES, messagesCount).join(' ')
  };
}

function createCommentGenerator() {
  let lastGeneratedId = 1;
  return function () {
    return createComment(lastGeneratedId++);
  };
}

export {createPostGenerator, createCommentGenerator};
