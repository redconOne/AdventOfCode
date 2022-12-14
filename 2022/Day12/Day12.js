const fs = require('fs');

const data = fs
  .readFileSync(__dirname + '/Day12.txt')
  .toString()
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const test = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const solve1 = (input) => {
  const starts = [];
  let end;
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      let elevation;
      if (char === 'S') {
        elevation = 0;
        starts.push([i, j]);
      } else if (char === 'E') {
        elevation = 25;
        end = [i, j];
      } else {
        elevation = char.codePointAt(0) - 'a'.codePointAt(0);
      }
      return elevation;
    })
  );

  const queue = starts.map((start) => ({ pos: start, steps: 0 }));
  const seen = [];
  while (queue.length) {
    const {
      pos: [i, j],
      steps,
    } = queue.shift();
    if (seen[i]?.[j]) {
      continue;
    }
    if (i === end[0] && j === end[1]) {
      console.log(steps);
      break;
    }
    for (const [di, dj] of dirs) {
      if (
        map[i + di]?.[j + dj] === undefined ||
        map[i + di][j + dj] > map[i][j] + 1 ||
        seen[i + di]?.[j + dj]
      ) {
        continue;
      }
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
    }
    seen[i] = seen[i] ?? [];
    seen[i][j] = 1;
  }

  console.log(seen);
};

const solve2 = (input) => {
  const starts = [];
  let end;
  const map = input.split('\n').map((line, i) =>
    line.split('').map((char, j) => {
      let elevation;
      if (char === 'S' || char === 'a') {
        elevation = 0;
        starts.push([i, j]);
      } else if (char === 'E') {
        elevation = 25;
        end = [i, j];
      } else {
        elevation = char.codePointAt(0) - 'a'.codePointAt(0);
      }
      return elevation;
    })
  );

  const queue = starts.map((start) => ({ pos: start, steps: 0 }));
  const seen = [];
  while (queue.length) {
    const {
      pos: [i, j],
      steps,
    } = queue.shift();
    if (seen[i]?.[j]) {
      continue;
    }
    if (i === end[0] && j === end[1]) {
      console.log(steps);
      break;
    }
    for (const [di, dj] of dirs) {
      if (
        map[i + di]?.[j + dj] === undefined ||
        map[i + di][j + dj] > map[i][j] + 1 ||
        seen[i + di]?.[j + dj]
      ) {
        continue;
      }
      queue.push({ pos: [i + di, j + dj], steps: steps + 1 });
    }
    seen[i] = seen[i] ?? [];
    seen[i][j] = 1;
  }

  console.log(seen);
};

console.log(solve1(data));
solve2(data);
