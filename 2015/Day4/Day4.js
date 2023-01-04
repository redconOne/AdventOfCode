const fs = require('fs');
const crypto = require('crypto');

const data = fs.readFileSync('./2015/Day4/Day4.txt', { encoding: 'utf-8' }).replace(/\r/g, '').trim();

const solve1 = (str) => {
  const MD5 = (data) => crypto.createHash('md5').update(data).digest('hex');
  const target = (data) => data.slice(0, 5) === '00000';

  let counter = 0;
  while (!target(MD5(`${str}${counter}`))) counter++;

  return counter;
};

console.log(solve1(data));

const solve2 = (str) => {
  const MD5 = (data) => crypto.createHash('md5').update(data).digest('hex');
  const target = (data) => data.slice(0, 6) === '000000';

  let counter = 0;
  while (!target(MD5(`${str}${counter}`))) counter++;

  return counter;
};

console.log(solve2(data));
