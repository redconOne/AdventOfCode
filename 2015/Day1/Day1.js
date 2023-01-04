const fs = require('fs');

const data = fs.readFileSync('./2015/Day1/Day1.txt', { encoding: 'utf-8' }).replace(/\r/g, '').trim();

const solve1 = (str) => {
  let result = 0;
  for (const instruction of str.split('')) result += instruction === '(' ? 1 : -1;

  return result;
};

console.log(solve1(data));

const solve2 = (str) => {
  let current = 0;
  let position = 1;

  for (const instruction of str.split('')) {
    current += instruction === '(' ? 1 : -1;
    if (current < 0) return position;
    position++;
  }
};

console.log(solve2(data));
