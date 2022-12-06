const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day4.txt').toString();

const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const solve1 = (str) => {
  let counter = 0;
  for (const group of str.split('\n')) {
    const firstElf = group.split(',')[0].split('-').map(Number);
    const secondElf = group.split(',')[1].split('-').map(Number);

    if (
      (firstElf[0] >= secondElf[0] && firstElf[1] <= secondElf[1]) ||
      (secondElf[0] >= firstElf[0] && secondElf[1] <= firstElf[1])
    )
      counter++;
  }

  return counter;
};

const solve2 = (str) => {
  let counter = 0;
  for (const group of str.split('\n')) {
    const firstElf = group.split(',')[0].split('-').map(Number);
    const secondElf = group.split(',')[1].split('-').map(Number);

    if (
      (firstElf[0] >= secondElf[0] && firstElf[0] <= secondElf[1]) ||
      (secondElf[0] >= firstElf[0] && secondElf[0] <= firstElf[1])
    )
      counter++;
  }
  return counter;
};

const test = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

// console.log('Solve 1 test :', solve1(test));
// console.log(solve1(input));

console.log('Solve 2 :', solve2(test));
// console.log(solve2(input));
