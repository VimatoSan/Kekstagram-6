function getRandomElementsFromArray(array, size = 1) {
  const selected = [];
  if (size >= array.length) {
    return array;
  }
  while (selected.length < size) {
    const index = generateRandomNumber(0, array.length - 1);
    if (!selected.includes(array[index])) {
      selected.push(array[index]);
    }
  }
  return selected;
}

function generateRandomNumber(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


export {getRandomElementsFromArray, generateRandomNumber, debounce, throttle};
