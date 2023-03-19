const fs = require('fs');

const data = fs
  .readFileSync('./2015/Day6/Day6.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim();

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

// console.log(solve1(test));
// console.log(solve1(data));

const solve2 = (str) => {
  let total = 0;
  let lights = [];

  for (let y = 0; y < 1000; y++) {
    let row = [];
    for (let x = 0; x < 1000; x++) row.push(0);
    lights.push(row);
  }

  for (const instruction of str.split('\n')) {
    const regexp = instruction.startsWith('turn')
      ? /turn (?<operation>.*) (?<startX>\d+),(?<startY>\d+) through (?<endX>\d+),(?<endY>\d+)/
      : /(?<operation>.*) (?<startX>\d+),(?<startY>\d+) through (?<endX>\d+),(?<endY>\d+)/;

    const { operation, startX, startY, endX, endY } =
      instruction.match(regexp).groups;

    for (let y = +startY; y <= +endY; y++) {
      for (let x = +startX; x <= +endX; x++) {
        if (operation === 'on') {
          total += 1;
          lights[y][x]++;
        } else if (operation === 'off') {
          total -= lights[y][x] > 0 ? 1 : 0;
          if (lights[y][x] > 0) lights[y][x]--;
        } else {
          total += 2;
          lights[y][x] += 2;
        }
      }
    }
  }

  const temp = lights[0];

  let result = 0;
  let min = 0;
  let max = 0;
  for (const row of lights)
    for (const light of row) {
      min = Math.min(min, light);
      max = Math.max(max, light);
      result += light;
      if (light < 0) console.log(light);
    }

  console.log(result);
  console.log(min);
  console.log(max);
  return total;
};

const test2 = `turn on 0,0 through 0,0
toggle 0,0 through 999,999`;

// console.log(solve2(test2));
console.log(solve2(data));
// 13824059
//
