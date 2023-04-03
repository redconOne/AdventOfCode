const fs = require('fs');
const data = fs.readFileSync('./2015/input/Day12.txt', { encoding: 'utf8' });

const sum = (input) => {
  if (typeof input === 'number') return input;
  if (typeof input === 'string') return 0;

  if (Array.isArray(input)) {
    return input.reduce((total, item) => {
      total += sum(item);
      return total;
    }, 0);
  }

  let total = 0;

  for (const key in input) total += sum(input[key]);

  return total;
};

const solve1 = (input) => {
  return sum(JSON.parse(input));
};

const sum2 = (input) => {
  if (typeof input === 'number') return input;
  if (typeof input === 'string') return 0;
  if (Array.isArray(input))
    return input.reduce((total, item) => total + sum2(item), 0);

  let total = 0;

  for (const key in input)
    if (input[key] !== 'red') total += sum2(input[key]);
    else return 0;

  return total;
};

const solve2 = (input) => {
  return sum2(JSON.parse(input));
};

console.log(solve1(data));
console.log(solve2(data));
