const fs = require('fs');
const data = fs.readFileSync('./2015/input/Day10.txt', { encoding: 'utf8' });

const lookSay = (input) => {
  let result = '';
  let currentChar = input[0];
  let currentLen = 0;

  for (const char of input.split(''))
    if (char === currentChar) currentLen++;
    else {
      result += currentLen + currentChar;
      currentChar = char;
      currentLen = 1;
    }

  return result + currentLen + currentChar;
};

const solve1 = (input) => {
  let result = input;

  for (let i = 0; i < 40; i++) result = lookSay(result);

  return result.length;
};

const solve2 = (input) => {
  let result = input;

  for (let i = 0; i < 50; i++) result = lookSay(result);

  return result.length;
};

console.log(solve1(data));
console.log(solve2(data));
