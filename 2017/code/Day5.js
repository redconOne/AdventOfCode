import { readFileSync } from 'fs';
const data = readFileSync('./2017/input/Day5.txt', { encoding: 'utf-8' });

const solve1 = (input) => {
  const nums = [];

  for (const num of input.split('\n')) nums.push(+num);

  let current = 0;
  let steps = 0;

  while (current < nums.length) {
    const temp = nums[current];
    nums[current]++;
    current += temp;
    steps++;
  }

  return steps;
};

const solve2 = (input) => {
  const nums = [];

  for (const num of input.split('\n')) nums.push(+num);

  let current = 0;
  let steps = 0;

  while (current < nums.length) {
    let temp = nums[current];
    if (temp >= 3) nums[current]--;
    else nums[current]++;
    current += temp;
    steps++;
  }

  return steps;
};

console.log(solve1(data));
console.log(solve2(data));
