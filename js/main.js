const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Олег', 'Алёна', 'Фёдор', 'Дмитрий', 'Мария'
];

function getRandomElementsFromArray(array, size = 1) {
  const selected = [];
  if (size >= array.length) {
    size = array.length;
  }
  while (selected.length < size) {
    const index = random(0, array.length - 1);
    if (!selected.includes(array[index])) {
      selected.push(array[index]);
    }
  }
  return selected;
}

function random(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function createPhoto(id, commentGenerator) {
  const comments = [];
  const commentSize = random(0, 30);
  for (let i = 0; i < commentSize; i++) {
    comments.push(commentGenerator());
  }
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'Cool photo!',
    likes: random(15, 200),
    comments: comments,
  };
}

function createPhotoGenerator(commentGenerator) {
  let lastGeneratedId = 1;
  return function () {
    return createPhoto(lastGeneratedId++, commentGenerator);
  };
}

function createComment(id) {
  const avatarId = random(1, 6);
  const messageCount = random(1, 2);
  return {
    id: id,
    avatar: `img/avatar-${avatarId}.svg`,
    name: getRandomElementsFromArray(NAMES)[0],
    message: getRandomElementsFromArray(MESSAGES, messageCount).join(' ')
  };
}

function createCommentGenerator() {
  let lastGeneratedId = 1;
  return function () {
    return createComment(lastGeneratedId++);
  };
}

function main() {
  const commentGenerator = createCommentGenerator();
  const photoGenerator = createPhotoGenerator(commentGenerator);

  const size = 25;
  const photos = [];
  for (let i = 1; i <= size; i++) {
    photos.push(photoGenerator());
  }

  console.log(photos);
}

main();
