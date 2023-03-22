const fs = require('fs');
const data = fs
  .readFileSync('./2015/input/Day1.txt', { encoding: 'utf8' })
  .trim();

const calcFloor = (input) => {
  let total = 0;

  for (const char of input.split('')) total += char === '(' ? 1 : -1;

  return total;
};

const solve1 = (str) => {
  let total = 0;

  for (const line of str.split('\n')) total += calcFloor(line);

  return total;
};

const calcBasement = (input) => {
  let total = 1;

  for (let i = 0; i < input.length; i++) {
    total += input[i] === '(' ? 1 : -1;
    if (total === -1) return i;
  }

  return -1;
};

const solve2 = (str) => {
  const loc = calcBasement(str);

  return loc;
};

console.log(solve1(data));
console.log(solve2(data));
