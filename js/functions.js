function checkStringLen(string, length) {
  return string.length <= length;
}

function isPalindrome(string) {
  let normalized = string.replaceAll(' ', '');
  normalized = normalized.toLowerCase();
  for (let i = 0; i <= normalized.length / 2; i++) {
    if (normalized[i] !== normalized[normalized.length - i - 1]) {
      return false;
    }
  }
  return true;
}

function parseNumbers(string) {
  let result = '';
  if (typeof string === 'number') {
    string = string.toString();
  }
  for (let i = 0; i < string.length; i++) {
    const num = parseInt(string[i], 10);
    if (!Number.isNaN(num)) {
      result += num;
    }
  }
  return parseInt(result, 10);
}

checkStringLen('проверяемая строка', 18);
parseNumbers('1 кефир, 0.5 батона');
isPalindrome('Лёша на полке клопа нашёл ');


console.log(isPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('ДовОд')); // true
// Это не палиндром
console.log(isPalindrome('Кекс'));  // false
