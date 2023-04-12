const fs = require('fs');
const data = fs.readFileSync('./2016/input/Day8.txt', { encoding: 'utf-8' });

class Screen {
  constructor(width, height) {
    this.screen = [];

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push('.');
      }
      this.screen.push(row);
    }
  }
  createRect(width, height) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) this.screen[i][j] = '#';
    }
  }
  rotateRow(row, amount) {
    while (amount) {
      const current = this.screen[row].pop();
      this.screen[row].unshift(current);
      amount--;
    }
  }
  rotateCol(col, amount) {
    const currentCol = [];
    for (const row of this.screen) {
      currentCol.push(row[col]);
    }

    while (amount) {
      const temp = currentCol.pop();
      currentCol.unshift(temp);
      amount--;
    }

    for (const row of this.screen) row[col] = currentCol.shift();
  }

  getLitPixels() {
    let litPixels = 0;

    for (const row of this.screen) {
      litPixels += row.filter((pixel) => pixel === '#').length;
    }

    return litPixels;
  }
}

const solve1 = (input) => {
  const screen = new Screen(50, 6);
  const rectRegex = /rect (?<width>\d+)x(?<height>\d+)/;
  const colRegex = /rotate column x=(?<col>\d+) by (?<amount>\d+)/;
  const rowRegex = /rotate row y=(?<row>\d+) by (?<amount>\d+)/;

  for (const instruction of input.split('\n')) {
    if (instruction.includes('rect')) {
      const { width, height } = instruction.match(rectRegex).groups;
      screen.createRect(+width, +height);
    } else if (instruction.includes('column')) {
      const { col, amount } = instruction.match(colRegex).groups;
      screen.rotateCol(+col, +amount);
    } else {
      const { row, amount } = instruction.match(rowRegex).groups;
      screen.rotateRow(+row, +amount);
    }
  }

  console.log(screen);

  return screen.getLitPixels();
};

const solve2 = (input) => {
  const screen = new Screen(50, 6);
  const rectRegex = /rect (?<width>\d+)x(?<height>\d+)/;
  const colRegex = /rotate column x=(?<col>\d+) by (?<amount>\d+)/;
  const rowRegex = /rotate row y=(?<row>\d+) by (?<amount>\d+)/;

  for (const instruction of input.split('\n')) {
    if (instruction.includes('rect')) {
      const { width, height } = instruction.match(rectRegex).groups;
      screen.createRect(+width, +height);
    } else if (instruction.includes('column')) {
      const { col, amount } = instruction.match(colRegex).groups;
      screen.rotateCol(+col, +amount);
    } else {
      const { row, amount } = instruction.match(rowRegex).groups;
      screen.rotateRow(+row, +amount);
    }
  }

  let result = [];

  for (const row of screen.screen) result.push(row.join(''));

  return result.join('\n');
};

console.log(solve1(data));
console.log(solve2(data));
