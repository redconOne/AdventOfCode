import { readFileSync } from 'fs';
const data = readFileSync('./2018/input/Day2.txt', { encoding: 'utf8' });

class ID {
  constructor(str) {
    this.str = str;
    this.dict = new Map();

    for (const char of str)
      if (this.dict[char]) this.dict[char]++;
      else this.dict[char] = 1;
  }

  containsDoubles() {
    for (const key in this.dict) if (this.dict[key] === 2) return true;
    return false;
  }

  containsTriples() {
    for (const key in this.dict) if (this.dict[key] === 3) return true;
    return false;
  }

  getDict() {
    return this.dict;
  }

  compareID(otherID) {
    let diff = 0;
    const otherStr = otherID.getStr();

    for (const i in this.str) if (otherStr[i] !== this.str[i]) diff++;

    return diff <= 1;
  }

  getStr() {
    return this.str;
  }

  getSimilar(other) {
    let result = '';
    const otherStr = other.getStr();

    for (const i in otherStr)
      if (otherStr[i] === this.str[i]) result += otherStr[i];

    return result;
  }
}

const solve1 = (input) => {
  let doubles = 0;
  let triples = 0;

  for (const line of input.split('\n')) {
    const id = new ID(line);
    if (id.containsDoubles()) doubles++;
    if (id.containsTriples()) triples++;
  }

  return doubles * triples;
};

const solve2 = (input) => {
  let ids = [];

  for (const line of input.split('\n')) {
    const currentID = new ID(line);
    for (const id of ids)
      if (currentID.compareID(id)) return currentID.getSimilar(id);
    ids.push(currentID);
  }

  return '-1';
};

console.log(solve1(data));
console.log(solve2(data));
