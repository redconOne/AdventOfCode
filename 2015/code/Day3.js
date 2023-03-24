const fs = require('fs');
const data = fs
  .readFileSync('./2015/input/Day3.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim();

const move = (location, move) => {
  switch (move) {
    case '<':
      location.x--;
      break;
    case '>':
      location.x++;
      break;
    case '^':
      location.y--;
      break;
    case 'v':
      location.y++;
      break;
    default:
      console.log('Something went wrong');
  }
};

const addLocation = (set, loc) => {
  set.add(`${loc.x},${loc.y}`);
};

const solve1 = (input) => {
  const location = { x: 0, y: 0 };
  let visited = new Set();
  visited.add(`${location.x},${location.y}`);

  for (const santaMove of input.split('')) {
    move(location, santaMove);
    addLocation(visited, location);
  }

  return visited.size;
};

const solve2 = (input) => {
  const visited = new Set();
  const santaLocation = { x: 0, y: 0 };
  const roboLocation = { x: 0, y: 0 };
  const instructions = input.split('');
  addLocation(visited, santaLocation);

  for (let i = 0; i < instructions.length - 1; i += 2) {
    const santaMove = instructions[i];
    const roboMove = instructions[i + 1];

    move(santaLocation, santaMove);
    move(roboLocation, roboMove);

    addLocation(visited, santaLocation);
    addLocation(visited, roboLocation);
  }

  return visited.size;
};

console.log(solve1(data));
console.log(solve2(data));
