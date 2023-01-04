const fs = require('fs');

const data = fs.readFileSync('./2015/Day3/Day3.txt', { encoding: 'utf-8' }).replace(/\r/g, '').trim();

const solve1 = (str) => {
  const visited = new Map();

  let x = 0;
  let y = 0;
  visited.set(`${x}:${y}`, true);

  for (const direction of str.split('')) {
    switch (direction) {
      case '>':
        x++;
        break;
      case '<':
        x--;
        break;
      case '^':
        y--;
        break;
      case 'v':
        y++;
        break;
    }

    const current = `${x}:${y}`;
    if (visited.has(current)) continue;
    visited.set(current, true);
  }

  return visited.size;
};

console.log(solve1(data));

const solve2 = (str) => {
  const visited = new Map();

  let santaX = 0;
  let santaY = 0;
  let roboX = 0;
  let roboY = 0;
  let santa = true;

  visited.set(`${santaX}:${santaY}`, true);

  for (const direction of str.split('')) {
    if (santa) {
      switch (direction) {
        case '>':
          santaX++;
          break;
        case '<':
          santaX--;
          break;
        case '^':
          santaY--;
          break;
        case 'v':
          santaY++;
          break;
      }

      const loc = `${santaX}:${santaY}`;
      if (!visited.has(loc)) visited.set(loc, true);
    } else {
      switch (direction) {
        case '>':
          roboX++;
          break;
        case '<':
          roboX--;
          break;
        case '^':
          roboY--;
          break;
        case 'v':
          roboY++;
          break;
      }

      const loc = `${roboX}:${roboY}`;
      if (!visited.has(loc)) visited.set(loc, true);
    }

    santa = !santa;
  }

  return visited.size;
};

console.log(solve2(data));
