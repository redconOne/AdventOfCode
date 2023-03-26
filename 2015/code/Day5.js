const fs = require('fs');
const data = fs
  .readFileSync('./2015/input/Day5.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim();

const rule1 = (input) => {
  if (/[aeiou]/.test(input)) return input.match(/[aeiou]/gi).length >= 3;
  return false;
};

const rule2 = (input) => {
  for (let i = 0; i < input.length - 1; i++)
    if (input[i] === input[i + 1]) return true;

  return false;
};

const rule3 = (input) => {
  return !/(ab)|(cd)|(pq)|(xy)/.test(input);
};

const isValid = (input) => rule1(input) && rule2(input) && rule3(input);

const solve1 = (input) => {
  let total = 0;

  for (const line of input.split('\n')) if (isValid(line)) total++;

  return total;
};

const rule4 = (input) => {
  for (let i = 0; i < input.length - 1; i++) {
    const pair = input.slice(i, i + 2);
    const loc = input.indexOf(pair);
    const last = input.lastIndexOf(pair);
    if (last - loc > 1) return true;
  }

  return false;
};

const rule5 = (input) => {
  for (let i = 0; i < input.length - 2; i++) {
    const start = input[i];
    const end = input[i + 2];
    if (start === end) return true;
  }
  return false;
};

const isNice = (input) => rule4(input) && rule5(input);

const solve2 = (input) => {
  let total = 0;

  for (const line of input.split('\n')) if (isNice(line)) total++;

  return total;
};

console.log(solve1(data));
console.log(solve2(data));
