const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day9.txt').toString();

const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const test = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const solve1 = (instructions) => {
  const visited = ['0:0'];
  var tailLoc = [0, 0],
    headLoc = [0, 0];

  for (const line of instructions.split('\n')) {
    const direction = line.split(' ')[0];
    var moves = +line.split(' ')[1];
    while (moves > 0) {
      if (direction === 'R') moveRight(headLoc, tailLoc, visited);
      else if (direction === 'L') moveLeft(headLoc, tailLoc, visited);
      else if (direction === 'U') moveUp(headLoc, tailLoc, visited);
      else if (direction === 'D') moveDown(headLoc, tailLoc, visited);
      moves--;
    }
  }

  return visited.length;
};

const moveRight = (headPos, tailPos, visited) => {
  headPos[0]++;
  if (tailPos[0] < headPos[0] - 1) {
    tailPos[0] = headPos[0] - 1;
    tailPos[1] = headPos[1];
    const tailCoord = tailPos[0].toString() + ':' + tailPos[1].toString();
    if (!visited.includes(tailCoord)) visited.push(tailCoord);
  }
};
const moveLeft = (headPos, tailPos, visited) => {
  headPos[0]--;
  if (tailPos[0] > headPos[0] + 1) {
    tailPos[0] = headPos[0] + 1;
    tailPos[1] = headPos[1];
    const tailCoord = tailPos[0].toString() + ':' + tailPos[1].toString();
    if (!visited.includes(tailCoord)) visited.push(tailCoord);
  }
};
const moveUp = (headPos, tailPos, visited) => {
  headPos[1]++;
  if (tailPos[1] < headPos[1] - 1) {
    tailPos[0] = headPos[0];
    tailPos[1] = headPos[1] - 1;
    const tailCoord = tailPos[0].toString() + ':' + tailPos[1].toString();
    if (!visited.includes(tailCoord)) visited.push(tailCoord);
  }
};
const moveDown = (headPos, tailPos, visited) => {
  headPos[1]--;
  if (tailPos[1] > headPos[1] + 1) {
    tailPos[0] = headPos[0];
    tailPos[1] = headPos[1] + 1;
    const tailCoord = tailPos[0].toString() + ':' + tailPos[1].toString();
    if (!visited.includes(tailCoord)) visited.push(tailCoord);
  }
};

const solve2 = (instructions) => {
  const distances = [...Array(10)].map(() => [0, 0]);
  const tail = distances.at(-1);
  const visited = { 0: { 0: 1 } };
  const toDir = {
    R: [0, 1],
    L: [0, -1],
    U: [-1, 0],
    D: [1, 0],
  };

  for (const line of instructions.split('\n')) {
    let [char, n] = line.split(' ');
    const dir = toDir[char];
    n = +n;

    for (let i = 0; i < n; i++) {
      let dist = distances[0];
      dist[0] += dir[0];
      dist[1] += dir[1];

      for (let j = 1; j < distances.length; j++) {
        const dist2 = distances[j];
        if (dist.some((x) => Math.abs(x) >= 2)) {
          const dir2 = dist.map(Math.sign);
          dist2[0] += dir2[0];
          dist2[1] += dir2[1];
          dist[0] -= dir2[0];
          dist[1] -= dir2[1];
        }
        dist = dist2;
      }
      visited[tail[0]] = visited[tail[0]] ?? {};
      visited[tail[0]][tail[1]] = 1;
    }
  }

  console.log(
    Object.values(visited)
      .map((row) => Object.values(row))
      .flat()
      .reduce((sum, num) => sum + num)
  );

  return Object.values(visited)
    .map((row) => Object.values(row))
    .flat()
    .reduce((acc, n) => acc + n);
};

// console.log(solve1(test));

// console.log(solve1(input));

console.log(solve2(input));

// 0, 0 ] true
// [ 0, 0 ] true
// [ 1, 0 ] true
// [ 2, 0 ] true
// [ 3, 0 ] true
// [ 3, 0 ] true
// [ 4, 1 ] true
// [ 4, 2 ] true
// [ 4, 3 ] true
// [ 4, 3 ] true
// [ 3, 4 ] true
// [ 2, 4 ] true
// [ 2, 4 ] true
// [ 2, 4 ] true
// [ 2, 4 ] true
// [ 3, 3 ] true
// [ 4, 3 ] true
// [ 4, 3 ] true
// [ 4, 3 ] true
// [ 4, 3 ] true
// [ 3, 2 ] true
// [ 2, 2 ] true
// [ 1, 2 ] true
