import { readFileSync } from 'fs';
const data = readFileSync('./2017/input/Day9.txt', { encoding: 'utf-8' });

const solve1 = (input) => {
  let total = 0;
  let acc = 1;
  let isGarbage = false;
  let skip = false;

  for (const char of input.split('')) {
    if (skip) {
      skip = false;
      continue;
    }
    if (char === '!') skip = true;
    if (char === '>') isGarbage = false;
    if (char === '<') isGarbage = true;
    if (isGarbage) continue;
    if (char === '{') {
      total += acc;
      acc++;
    }
    if (char === '}') acc--;
  }

  return total;
};

const solve2 = (input) => {
  let total = 0;
  let isGarbage = false;
  let skip = false;

  for (const char of input.split('')) {
    if (skip) {
      skip = false;
      continue;
    }
    if (char === '!') {
      skip = true;
      continue;
    }
    if (char === '>') isGarbage = false;
    if (isGarbage) total++;
    if (char === '<') isGarbage = true;
  }
  return total;
};

console.log(solve1(data));
console.log(solve2(data));

console.log(solve2('<>'));
console.log(solve2('<random characters>'));
console.log(solve2('<<<<>'));
console.log(solve2('<{!>}>'));
console.log(solve2('<!!>'));
console.log(solve2('<!!!>>'));
console.log(solve2('<{o"i!a,<{i<a>'));
