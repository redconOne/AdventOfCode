const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day6.txt').toString();

const input = data;

const solve1 = (str) => {
  const current = [];
  let num = 0;

  for (const char of str) {
    num++;
    if (current.length < 4) {
      current.push(char);
      continue;
    }
    current.shift();
    current.push(char);

    if (new Set(current).size === 4) return num;
  }
  return num;
};

const solve2 = (str) => {
  const current = [];
  let num = 0;

  for (const char of str) {
    num++;

    if (current.length < 14) {
      current.push(char);
      continue;
    }

    current.shift();
    current.push(char);

    if (new Set(current).size === 14) return num;
  }

  return num;
};

const test = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

console.log('Solve 1 test :', solve1(test));
console.log(solve1(input));

console.log('Solve 2 :', solve2(test));
console.log(solve2(input));
