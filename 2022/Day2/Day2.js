const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day2.txt').toString();
const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const solve1 = (str) => {
  const values = ' RPS';
  const obj = {
    A: 'R',
    B: 'P',
    C: 'S',
    Y: 'P',
    X: 'R',
    Z: 'S',
    R: 'P',
    P: 'S',
    S: 'R',
  };
  let score = 0;

  for (const line of str.split('\n')) {
    const them = obj[line.split(' ')[0]];
    const us = obj[line.split(' ')[1]];

    if (obj[them] === us) score += 6;
    if (them === us) score += 3;

    score += values.indexOf(us);
  }

  return score;
};

const solve2 = (str) => {
  const values = ' RPS';
  const obj = {
    A: 'R',
    B: 'P',
    C: 'S',
    Y: 3,
    X: 0,
    Z: 6,
    R6: 'P',
    R0: 'S',
    P6: 'S',
    P0: 'R',
    S6: 'R',
    S0: 'P',
  };
  let score = 0;

  for (const line of str.split('\n')) {
    const them = obj[line.split(' ')[0]];
    const us = obj[line.split(' ')[1]];

    if (us === 0) score += values.indexOf(obj[them + us]);
    if (us === 3) score += values.indexOf(them) + us;
    if (us === 6) score += values.indexOf(obj[them + us]) + us;
  }

  return score;
};

const test = `A Y
B X
C Z`;

console.log('Test 1 expect : ' + solve1(test) + ' to be 15');
console.log(solve1(input));

console.log('Test 2 expect : ' + solve2(test) + ' to be 12');
console.log(solve2(input));
