const fs = require('fs');

const data = fs
  .readFileSync(__dirname + '/Day14.txt')
  .toString()
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const test = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const createBounds = (str) => {
  str = str
    .trim()
    .split('\n')
    .map((line) =>
      line.split('->').map((grouping) => grouping.split(',').map(Number))
    );

  const maxX = Math.max(...str.flat().map((coords) => coords[0])) + 1;
  const minX = Math.min(...str.flat().map((coords) => coords[0])) - 1;
  const maxY = Math.max(...str.flat().map((coords) => coords[1]));

  return [str, maxX, minX, maxY];
};

const createField = () => {
  const field = Array.from(
    { length: maxY + 1 },
    () => new Uint8Array(maxX - minX + 1)
  );

  start.forEach((points) =>
    points.forEach(([posX, posY], index) => {
      if (!index) {
        field[posY][posX - minX] = 1;
        return;
      }
      let [ix, iy] = points[index - 1];
      const dx = Math.sign(posX - ix);
      const dy = Math.sign(posY - iy);

      while (posX !== ix || posY !== iy) {
        ix += dx;
        iy += dy;
        field[iy][ix - minX] = 1;
      }
    })
  );

  return field;
};

function* getSand(field, startX) {
  let x = startX;
  let y = 0;
  let c = 0;

  while (y < field.length - 1 && field[y][x] === 0) {
    if (field[y + 1][x]) {
      if (field[y + 1][x - 1] === 0) x--;
      else if (field[y + 1][x + 1] === 0) x++;
      else {
        field[y][x] = 2;
        c++;
        yield [y, x];
        x = startX;
        y = 0;
        continue;
      }
    }
    y++;
  }
}

const [start, maxX, minX, maxY] = createBounds(data);
const cave = createField();
const startX = 500 - minX;

const offset = cave.length - startX;
const rowSize = cave.length * 2 + 1;
const extendedField = [
  ...cave.map((row) => {
    const newRow = new Uint8Array(rowSize);
    newRow.set(row, offset);
    return newRow;
  }),
  new Uint8Array(rowSize),
  new Uint8Array(rowSize).fill(1),
];

console.log([...getSand(cave, startX)].length);
console.log([...getSand(extendedField, offset + startX)].length);
