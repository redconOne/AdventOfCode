const fs = require('fs');

const data = fs.readFileSync('./2015/Day2/Day2.txt', { encoding: 'utf-8' }).replace(/\r/g, '').trim();

const solve1 = (str) => {
  const regexp = /(?<length>\d+)x(?<width>\d+)x(?<height>\d+)/;

  let total = 0;

  for (const line of str.split('\n')) {
    const { length, width, height } = line.match(regexp).groups;
    const required = 2 * (length * width + width * height + length * height);
    const extra = [length, width, height].sort((a, b) => a - b);
    extra.pop();

    total += required + extra.reduce((sum, num) => sum * num, 1);
  }

  return total;
};

console.log(solve1(data));

const solve2 = (str) => {
  const regexp = /(?<length>\d+)x(?<width>\d+)x(?<height>\d+)/;

  let ribbon = 0;

  for (const line of str.split('\n')) {
    const { length, width, height } = line.match(regexp).groups;
    const arr = [length, width, height].sort((a, b) => a - b);
    arr.pop();

    ribbon += +length * +width * +height;
    ribbon += arr.reduce((sum, num) => sum + +num + +num, 0);
  }

  return ribbon;
};

console.log(solve2(data));
