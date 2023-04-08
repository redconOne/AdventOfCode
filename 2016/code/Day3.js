const fs = require('fs');
const data = fs
  .readFileSync('./2016/input/Day3.txt', { encoding: 'utf8' })
  .trim();

const isTriangle = (s1, s2, s3) => s1 + s2 > s3 && s2 + s3 > s1 && s1 + s3 > s2;

const solve1 = (input) => {
  let total = 0;
  const regex = /(?<s1>\d+)\s+(?<s2>\d+)\s+(?<s3>\d+)/;

  for (const line of input.split('\n')) {
    const { s1, s2, s3 } = line.match(regex).groups;

    if (isTriangle(+s1, +s2, +s3)) total++;
  }

  return total;
};

const solve2 = (input) => {
  let total = 0;
  const regex = /(?<s1>\d+)\s+(?<s2>\d+)\s+(?<s3>\d+)/;
  const tri1 = [];
  const tri2 = [];
  const tri3 = [];

  for (const line of input.split('\n')) {
    const { s1, s2, s3 } = line.match(regex).groups;
    tri1.push(+s1);
    tri2.push(+s2);
    tri3.push(+s3);

    if (tri1.length === 3) {
      if (isTriangle(tri1.pop(), tri1.pop(), tri1.pop())) total++;
      if (isTriangle(tri2.pop(), tri2.pop(), tri2.pop())) total++;
      if (isTriangle(tri3.pop(), tri3.pop(), tri3.pop())) total++;
    }
  }

  return total;
};

console.log(solve1(data));
console.log(solve2(data));
