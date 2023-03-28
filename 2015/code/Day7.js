const fs = require('fs');
const data = fs
  .readFileSync('./2015/input/Day7.txt', { encoding: 'utf8' })
  .replace(/\r/g, '')
  .trim();

const isNumber = (input) => !/[^0-9]/.test(input);
const andWires = (input, map) => {
  const regex = /(?<w1>.*) AND (?<w2>.*) -> (?<key>\w+)/;
  const { w1, w2, key } = input.match(regex).groups;
  const wire1 = isNumber(w1) ? +w1 : map.get(w1);
  const wire2 = isNumber(w2) ? +w2 : map.get(w2);
  if (wire1 === undefined || wire2 === undefined) return;
  map.set(key, wire1 & wire2);
};
const orWires = (input, map) => {
  const regex = /(?<w1>.*) OR (?<w2>.*) -> (?<key>\w+)/;
  const { w1, w2, key } = input.match(regex).groups;
  const wire1 = isNumber(w1) ? +w1 : map.get(w1);
  const wire2 = isNumber(w2) ? +w2 : map.get(w2);
  if (wire1 === undefined || wire2 === undefined) return;
  map.set(key, wire1 | wire2);
};
const notWires = (input, map) => {
  const regex = /NOT (?<w>.*) -> (?<key>\w+)/;
  const { w, key } = input.match(regex).groups;
  const wire = isNumber(w) ? +w1 : map.get(w);
  if (wire === undefined) return;
  map.set(key, 65535 - wire);
};
const leftShift = (input, map) => {
  const regex = /(?<w>.*) LSHIFT (?<shift>.*) -> (?<key>\w+)/;
  const { w, shift, key } = input.match(regex).groups;
  const wire = isNumber(w) ? +w : map.get(w);
  if (wire === undefined) return;
  map.set(key, wire << shift);
};
const rightShift = (input, map) => {
  const regex = /(?<w>.*) RSHIFT (?<shift>.*) -> (?<key>\w+)/;
  const { w, shift, key } = input.match(regex).groups;
  const wire = isNumber(w) ? +w : map.get(w);
  if (wire === undefined) return;
  map.set(key, wire >> shift);
};

const solve1 = (input) => {
  const map = new Map();

  let counter = 100;
  while (map.get('a') === undefined)
    for (const line of input.split('\n')) {
      switch (true) {
        case line.includes('AND'):
          andWires(line, map);
          break;
        case line.includes('OR'):
          orWires(line, map);
          break;
        case line.includes('NOT'):
          notWires(line, map);
          break;
        case line.includes('SHIFT'):
          line.includes('L') ? leftShift(line, map) : rightShift(line, map);
          break;
        default:
          const regex = /(?<w>.*) -> (?<key>\w+)/;
          const { w, key } = line.match(regex).groups;
          const wire = isNumber(w) ? +w : map.get(w);
          if (wire !== undefined) map.set(key, wire);
          break;
      }
    }

  return map.get('a');
};

const solve2 = (input) => {
  const map = new Map();
  map.set('b', 46065);

  while (map.get('a') === undefined)
    for (const line of input.split('\n')) {
      switch (true) {
        case line.includes('AND'):
          andWires(line, map);
          break;
        case line.includes('OR'):
          orWires(line, map);
          break;
        case line.includes('NOT'):
          notWires(line, map);
          break;
        case line.includes('SHIFT'):
          line.includes('L') ? leftShift(line, map) : rightShift(line, map);
          break;
        default:
          const regex = /(?<w>.*) -> (?<key>\w+)/;
          const { w, key } = line.match(regex).groups;
          if (key === 'b') continue;
          const wire = isNumber(w) ? +w : map.get(w);
          if (wire !== undefined) map.set(key, wire);
          break;
      }
    }

  return map.get('a');
};

console.log(solve1(data));
console.log(solve2(data));
