const fs = require('fs');
const data = fs.readFileSync('./2016/input/Day9.txt', { encoding: 'utf-8' });

const solve1 = (input) => {
  let output = '';
  let i = 0;

  while (i < input.length) {
    const char = input[i++];

    if (char === ' ' || char === '\n') continue;

    if (char !== '(') {
      output += char;
      continue;
    }

    let s = i++;
    while (input[i++] !== 'x') {}
    const length = parseInt(input.slice(s, i - 1), 10);

    s = i++;
    while (input[i++] !== ')') {}
    let count = parseInt(input.slice(s, i - 1), 10);

    const dataSlice = input.slice(i, i + length);
    while (count--) output += dataSlice;

    i += length;
  }

  console.log(i);

  return output;
};

const solve2 = (input) => {
  let output = 0;
  let i = 0;

  while (i < input.length) {
    const char = input[i++];

    if (char === ' ' || char === '\n') continue;

    if (char !== '(') {
      output += 1;
      continue;
    }

    let s = i++;
    while (input[i++] !== 'x') {}
    const length = +input.slice(s, i - 1);

    s = i++;
    while (input[i++] !== ')') {}
    let count = +input.slice(s, i - 1);

    const rawData = input.slice(i, i + length);

    const newData = solve2(rawData);
    while (count--) output += newData;

    i += length;
  }

  return output;
};

console.log(solve1(data));
console.log(solve2(data));
