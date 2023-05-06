import { readFileSync } from 'fs';

const data = readFileSync('./2018/input/Day3.txt', { encoding: 'utf8' });

class Fabric {
  constructor(size) {
    this.arr = [];

    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) row.push('.');
      this.arr.push(row);
    }
  }

  addClaim(id, startX, startY, endX, endY) {
    for (let y = startY; y < endY && y < this.arr.length; y++) {
      for (let x = startX; x < endX && x < this.arr[y].length; x++) {
        if (this.arr[y][x] === '.') this.arr[y][x] = id;
        else this.arr[y][x] = 'X';
      }
    }
  }

  getOverlap() {
    let overlap = 0;

    for (let y = 0; y < this.arr.length; y++)
      for (let x = 0; x < this.arr[y].length; x++)
        overlap += this.arr[y][x] === 'X' ? 1 : 0;

    return overlap;
  }

  isClaimIntact(id, startX, startY, endX, endY) {
    for (let y = startY; y < endY; y++)
      for (let x = startX; x < endX; x++)
        if (this.arr[y][x] !== id) return false;

    return true;
  }

  getFabric() {
    let current = this.arr.map((row) => row.join('')).join('\n');
    return current;
  }
}

const solve1 = (input) => {
  const fabric = new Fabric(1000);
  const regex =
    /#(?<id>\d+) @ (?<startX>\d+),(?<startY>\d+): (?<width>\d+)x(?<length>\d+)/;
  const claims = new Map();

  for (const line of input.split('\n')) {
    const { id, startX, startY, width, length } = line.match(regex).groups;
    const endX = +startX + +width;
    const endY = +startY + +length;
    fabric.addClaim(id, +startX, +startY, endX, endY);
    const patch = { startX: +startX, startY: +startY, endX: endX, endY: endY };
    claims.set(id, patch);
  }

  let result = '';

  for (const id of claims.keys()) {
    const current = claims.get(id);
    const startX = current.startX;
    const startY = current.startY;
    const endX = current.endX;
    const endY = current.endY;
    if (fabric.isClaimIntact(id, startX, startY, endX, endY)) result = id;
  }

  return result;
};

console.log(solve1(data));
