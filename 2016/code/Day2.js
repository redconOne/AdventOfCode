const fs = require('fs');
const data = fs.readFileSync('./2016/input/Day2.txt', { encoding: 'utf8' });

class Numpad {
  constructor(pad, start) {
    this.pad = pad;
    this.col = start.col;
    this.row = start.row;
  }
  moveUp() {
    if (this.row === 0) return;

    const next = this.pad[this.row - 1][this.col];
    if (next !== ' ') this.row--;
  }
  moveDown() {
    if (this.row >= this.pad.length - 1) return;

    const next = this.pad[this.row + 1][this.col];
    if (next !== ' ') this.row++;
  }
  moveLeft() {
    if (this.col === 0) return;

    const next = this.pad[this.row][this.col - 1];
    if (next !== ' ') this.col--;
  }
  moveRight() {
    if (this.col >= this.pad[this.row].length - 1) return;

    const next = this.pad[this.row][this.col + 1];
    if (next !== ' ') this.col++;
  }
  getLocation() {
    return this.pad[this.row][this.col];
  }
}

const solve1 = (input) => {
  const code = [];
  const arr = [];
  arr.push('123'.split(''));
  arr.push('456'.split(''));
  arr.push('789'.split(''));

  const numpad = new Numpad(arr, { row: 1, col: 0 });

  for (const line of input.split('\n')) {
    for (const char of line.split(''))
      switch (char) {
        case 'U':
          numpad.moveUp();
          break;
        case 'L':
          numpad.moveLeft();
          break;
        case 'D':
          numpad.moveDown();
          break;
        case 'R':
          numpad.moveRight();
          break;
      }
    code.push(numpad.getLocation());
  }

  return code.join('');
};

const solve2 = (input) => {
  const code = [];
  const arr = [];
  arr.push('  1  '.toUpperCase().split(''));
  arr.push(' 234 '.toUpperCase().split(''));
  arr.push('56789'.toUpperCase().split(''));
  arr.push(' abc '.toUpperCase().split(''));
  arr.push('  d  '.toUpperCase().split(''));
  const numpad = new Numpad(arr, { row: 2, col: 0 });

  for (const line of input.split('\n')) {
    for (const char of line.split(''))
      switch (char) {
        case 'U':
          numpad.moveUp();
          break;
        case 'D':
          numpad.moveDown();
          break;
        case 'L':
          numpad.moveLeft();
          break;
        case 'R':
          numpad.moveRight();
          break;
      }
    code.push(numpad.getLocation());
  }

  return code.join('');
};

console.log(solve1(data));
console.log(solve2(data));
