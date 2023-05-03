import { readFileSync } from 'fs';
const data = readFileSync('./2017/input/Day10.txt', { encoding: 'utf-8' });

const solve1 = (input, temp = 256) => {
  let arr = Array.from(new Array(temp), (x, i) => i);
  let acc = 0;
  let pos = 0;
  let skip = 0;

  for (const num of input.split(',')) {
    let currentString = [];
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      currentString.push(arr[(pos + i) % len]);
    }
    const reversed = currentString.slice(0, +num).reverse();
    const remaining = currentString.slice(+num);
    currentString = reversed.concat(remaining);
    arr = [];
    for (let i = 0; i < len; i++) arr[(pos + i) % len] = currentString[i];
    pos = (+num + skip + pos) % len;
    skip++;
  }

  return arr.slice(0, 2).reduce((sum, num) => sum * num, 1);
};

const solve2 = (input) => {
  let pos = 0;
  let skip = 0;
  let arr = Array.from(new Array(256), (x, i) => i);
  let sequence = input
    .split('')
    .map((x) => x.charCodeAt(0))
    .concat([17, 31, 73, 47, 23]);

  for (let count = 0; count < 64; count++) {
    for (const num of sequence) {
      let currentString = [];
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        currentString.push(arr[(pos + i) % len]);
      }
      const reversed = currentString.slice(0, +num).reverse();
      const remaining = currentString.slice(+num);
      currentString = reversed.concat(remaining);
      arr = [];
      for (let i = 0; i < len; i++) arr[(pos + i) % len] = currentString[i];
      pos = (+num + skip + pos) % len;
      skip++;
    }
  }

  const result = [];

  for (let i = 0; i < arr.length; i += 16) {
    const row = [];
    for (let j = 0; j < 16; j++) row.push(arr[i + j]);
    result.push(row.reduce((res, num) => res ^ num));
  }

  return result.map((x) => x.toString(16).padStart(2, '0')).join('');
};

console.log(solve1(data));
console.log(solve2(data));
