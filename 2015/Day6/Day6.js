const fs = require('fs');

const data = fs
  .readFileSync('./2015/Day6/Day6.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim();

const changeLight = (task, x, y, lights) => {
  switch (task) {
    case 'on':
      lights[y][x] = true;
      break;
    case 'off':
      lights[y][x] = false;
      break;
    case 'toggle':
      lights[y][x] = !lights[y][x];
      break;
    default:
      console.log('Something went wrong in the switch.');
  }
};

const solve1 = (str) => {
  const lights = [];
  let total = 0;

  for (let i = 0; i < 1000; i++) {
    const row = [];
    for (let j = 0; j < 1000; j++) row.push(false);
    lights.push(row);
  }

  for (const instruction of str.split('\n')) {
    const regexp = instruction.startsWith('turn')
      ? /turn (?<operation>.*) (?<startX>\d+),(?<startY>\d+) through (?<endX>\d+),(?<endY>\d+)/
      : /(?<operation>.*) (?<startX>\d+),(?<startY>\d+) through (?<endX>\d+),(?<endY>\d+)/;

    const { operation, startX, startY, endX, endY } =
      instruction.match(regexp).groups;

    for (let i = +startY; i <= +endY; i++)
      for (let j = +startX; j <= +endX; j++)
        if (operation === 'on') {
          total += lights[j][i] ? 0 : 1;
          lights[j][i] = true;
        } else if (operation === 'off') {
          total -= lights[j][i] ? 1 : 0;
          lights[j][i] = false;
        } else {
          total += lights[j][i] ? -1 : 1;
          lights[j][i] = !lights[j][i];
        }
  }

  return total;
};

const test = `turn on 0,0 through 999,999
turn off 0,0 through 999,999
turn on 0,0 through 2,2`;

const test2 = `turn off 0,0 through 4,4
turn on 0,0 through 2,2
turn off 0,0 through 0,0`;

const test3 = `turn off 0,0 through 9,9
turn on 0,0 through 9,9
turn off 0,0 through 9,9
turn on 0,0 through 1,1`;

// console.log(solve1(test));
// console.log(solve1(test2));
// console.log(solve1(test3))
console.log(solve1(data));

const solve2 = (str) => {};
