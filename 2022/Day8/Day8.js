const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day8.txt').toString();
const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const test = `30373
25512
65332
33549
35390`;

const solve1 = (str) => {
  const arr = [];
  let counter = 0;
  for (const line of str.split('\n')) arr.push(line.split('').map(Number));

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr.length; x++) {
      if (isVis(arr, [y, x])) counter++;
    }
  }

  return counter;
};

const isVis = (grid, coord) => {
  if (coord[1] === 0) return true;
  if (coord[1] === grid[0].length - 1) return true;
  if (coord[0] === 0) return true;
  if (coord[0] === grid.length - 1) return true;

  const target = grid[coord[0]][coord[1]];

  //check left
  const left = [];
  for (let x = coord[1] - 1; x >= 0; x--) {
    left.push(grid[coord[0]][x]);
  }
  if (target > Math.max(...left)) return true;

  //check right
  const right = [];
  for (let x = coord[1] + 1; x < grid[coord[0]].length; x++) {
    right.push(grid[coord[0]][x]);
  }
  if (target > Math.max(...right)) return true;

  //check up
  const up = [];
  for (let y = coord[0] - 1; y >= 0; y--) {
    up.push(grid[y][coord[1]]);
  }
  if (target > Math.max(...up)) return true;

  //check down
  const down = [];
  for (let y = coord[0] + 1; y < grid.length; y++) {
    down.push(grid[y][coord[1]]);
  }
  if (target > Math.max(...down)) return true;

  return false;
};
const solve2 = (str) => {
  const arr = [];
  let best = 0;
  for (const line of str.split('\n')) arr.push(line.split('').map(Number));

  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr.length; x++) {
      const current = score(arr, [y, x]);
      if (current > best) best = current;
    }
  }

  return best;
};

const score = (grid, coord) => {
  const target = grid[coord[0]][coord[1]];

  //check left
  const left = [];
  for (let x = coord[1] - 1; x >= 0; x--) {
    const tree = grid[coord[0]][x];
    left.push(tree);
    if (tree >= target) break;
  }

  //check right
  const right = [];
  for (let x = coord[1] + 1; x < grid[coord[0]].length; x++) {
    const tree = grid[coord[0]][x];
    right.push(tree);
    if (tree >= target) break;
  }

  //check up
  const up = [];
  for (let y = coord[0] - 1; y >= 0; y--) {
    const tree = grid[y][coord[1]];
    up.push(tree);
    if (tree >= target) break;
  }

  //check down
  const down = [];
  for (let y = coord[0] + 1; y < grid.length; y++) {
    const tree = grid[y][coord[1]];
    down.push(tree);
    if (tree >= target) break;
  }

  const senicScore = left.length * right.length * up.length * down.length;

  return senicScore;
};
// console.log(solve1(test));

// console.log(solve1(input));

console.log(solve2(test));

console.log(solve2(input));
