import { readFileSync } from 'fs';
const data = readFileSync('./2017/input/Day3.txt', { encoding: 'utf-8' });

const solve1 = (input) => {
  const squareRoot = Math.ceil(Math.sqrt(input));
  const gridSize = squareRoot + ((squareRoot - 1) % 2 === 0 ? 2 : 3);

  const grid = [];

  for (let i = 0; i < gridSize; i++) grid.push(new Array(gridSize));

  const position = {
    x: Math.floor(gridSize / 2),
    y: Math.floor(gridSize / 2),
  };

  for (let i = 1; i <= input; i++) {
    grid[position.y][position.x] = i;

    if (grid[position.y][position.x] === input)
      return (
        Math.abs(position.x - Math.floor(gridSize / 2)) +
        Math.abs(position.y - Math.floor(gridSize / 2))
      );

    if (!grid[position.y][position.x - 1]) {
      if (
        grid[position.y + 1][position.x - 1] &&
        grid[position.y + 1][position.x]
      )
        position.x--;
      else {
        if (grid[position.y][position.x + 1]) {
          if (!grid[position.y + 1][position.x]) position.y++;
          else position.x--;
        } else position.x++;
      }
    } else {
      if (!grid[position.y][position.x + 1] && grid[position.y - 1][position.x])
        position.x++;
      else position.y--;
    }
  }
};

const solve2 = (input) => {
  const squareRoot = Math.ceil(Math.sqrt(input));
  const gridSize = squareRoot + ((squareRoot - 1) % 2 === 0 ? 2 : 3);
  const grid = [];

  const getAdjacentSum = (pos) => {
    const adjacentSum =
      (grid[pos.y - 1][pos.x - 1] || 0) +
      (grid[pos.y - 1][pos.x] || 0) +
      (grid[pos.y - 1][pos.x + 1] || 0) +
      (grid[pos.y][pos.x - 1] || 0) +
      (grid[pos.y][pos.x + 1] || 0) +
      (grid[pos.y + 1][pos.x - 1] || 0) +
      (grid[pos.y + 1][pos.x] || 0) +
      (grid[pos.y + 1][pos.x + 1] || 0);

    return adjacentSum ? adjacentSum : 1;
  };

  for (let i = 0; i < gridSize; i++) grid.push(new Array(gridSize));

  const pos = {
    x: Math.floor(gridSize / 2),
    y: Math.floor(gridSize / 2),
  };

  for (let i = 1; i <= input; i++) {
    grid[pos.y][pos.x] = getAdjacentSum(pos);

    if (grid[pos.y][pos.x] > input) {
      return grid[pos.y][pos.x];
    }

    if (!grid[pos.y][pos.x - 1]) {
      if (grid[pos.y + 1][pos.x - 1] && grid[pos.y + 1][pos.x]) {
        pos.x -= 1;
      } else {
        if (grid[pos.y][pos.x + 1]) {
          if (!grid[pos.y + 1][pos.x]) {
            pos.y += 1;
          } else {
            pos.x -= 1;
          }
        } else {
          pos.x += 1;
        }
      }
    } else {
      if (!grid[pos.y][pos.x + 1] && grid[pos.y - 1][pos.x]) {
        pos.x += 1;
      } else {
        pos.y -= 1;
      }
    }
  }
};

console.log(solve1(+data));
console.log(solve2(+data));
