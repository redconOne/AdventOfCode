const fs = require('fs');
const data = fs.readFileSync('./2017/input/Day1.txt', { encoding: 'utf-8' });

const solve1 = (input) => {
  let total = 0;

  for (let i = 0; i <= input.length; i++) {
    const num1 = input[i];
    const num2 = input[i + 1] || input[0];
    if (num1 === num2) total += +num1;
  }

  return total;
};

const solve2 = (input) => {
  let total = 0;

  for (let i = 0; i < input.length / 2; i++) {
    const num1 = input[i];
    const num2 = input[input.length / 2 + i];
    if (num1 === num2) total += +num1 * 2;
  }

  return total;
};

console.log(solve1(data));
console.log(solve2(data));
