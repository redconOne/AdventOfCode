const fs = require('fs');
const data = fs
  .readFileSync('./2015/input/Day8.txt', { encoding: 'utf8' })
  .replace(/\r/g, '')
  .trim();

const findActual = (input) => {
  return input
    .replace(/\\\\/g, '*')
    .replace(/\\"/g, '*')
    .replace(/\\x[0-9a-f]{2}/g, '*')
    .replace(/["\n]/g, '');
};

const solve1 = (input) => {
  let total = 0;
  let actual = 0;

  for (const line of input.split('\n')) {
    total += line.length;
    actual += findActual(line).length;
  }

  return total - actual;
};

const encode = (input) => {
  return input.replace(/^"/, '**').replace(/["\\]/g, '**');
};

const solve2 = (input) => {
  let total = 0;
  let actual = 0;

  for (const line of input.split('\n')) {
    total += line.length;
    actual += encode(line).length + 2;
  }

  return actual - total;
};

console.log(solve1(data));
console.log(solve2(data));
