const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'My weekend',
  'Amazing breakfast in cafe',
  'Team Falcons - winner of TI 14'
];

const LOAD_COMMENTS_COUNT = 5;

const NAMES = [
  'Олег', 'Алёна', 'Фёдор', 'Дмитрий', 'Мария'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

const MIN_MESSAGES_COUNT = 1;
const MAX_MESSAGES_COUNT = 2;

const MAX_HASHTAGS_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/;


export {MESSAGES, DESCRIPTIONS, NAMES, MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, MIN_AVATAR_ID, MAX_AVATAR_ID, MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT, LOAD_COMMENTS_COUNT, MAX_HASHTAGS_COUNT, MAX_DESCRIPTION_LENGTH, HASHTAG_REGEXP};
