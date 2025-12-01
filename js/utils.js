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

export {getRandomElementsFromArray, generateRandomNumber};
