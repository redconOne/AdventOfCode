import { readFileSync } from 'fs';
const data = readFileSync('./2017/input/Day8.txt', { encoding: 'utf8' });

const solve1 = (input) => {
  const map = new Map();
  let nameRegex = /(?<name>\w+) (?<others>.*)/;

  for (const line of input.split('\n')) {
    const { name } = line.match(nameRegex).groups;
    map.set(name, 0);
  }

  const compare = (name, cond, amount) => {
    switch (cond) {
      case '==':
        return map.get(name) == +amount;
        break;
      case '!=':
        return map.get(name) != +amount;
        break;
      case '>':
        return map.get(name) > +amount;
        break;
      case '>=':
        return map.get(name) >= +amount;
        break;
      case '<':
        return map.get(name) < +amount;
        break;
      case '<=':
        return map.get(name) <= +amount;
        break;
      default:
        return 'ERROR';
    }
  };

  let regex =
    /(?<name>\w+) (?<modifier>\w+) (?<modAmount>-?\d+) if (?<comparedName>\w+) (?<condition>.*) (?<comparedAmount>-?\d+)/;
  for (const line of input.split('\n')) {
    const {
      name,
      modifier,
      modAmount,
      comparedName,
      condition,
      comparedAmount,
    } = line.match(regex).groups;
    const result = compare(comparedName, condition, comparedAmount);
    if (result) {
      if (modifier === 'inc') map.set(name, map.get(name) + +modAmount);
      else map.set(name, map.get(name) - +modAmount);
    }
  }

  let max = 0;

  for (const val of map.values()) max = Math.max(val, max);

  return max;
};

const solve2 = (input) => {
  const map = new Map();
  let nameRegex = /(?<name>\w+) (?<others>.*)/;

  for (const line of input.split('\n')) {
    const { name } = line.match(nameRegex).groups;
    map.set(name, 0);
  }

  const compare = (name, cond, amount) => {
    switch (cond) {
      case '==':
        return map.get(name) == +amount;
        break;
      case '!=':
        return map.get(name) != +amount;
        break;
      case '>':
        return map.get(name) > +amount;
        break;
      case '>=':
        return map.get(name) >= +amount;
        break;
      case '<':
        return map.get(name) < +amount;
        break;
      case '<=':
        return map.get(name) <= +amount;
        break;
      default:
        return 'ERROR';
    }
  };

  let max = 0;
  let regex =
    /(?<name>\w+) (?<modifier>\w+) (?<modAmount>-?\d+) if (?<comparedName>\w+) (?<condition>.*) (?<comparedAmount>-?\d+)/;
  for (const line of input.split('\n')) {
    const {
      name,
      modifier,
      modAmount,
      comparedName,
      condition,
      comparedAmount,
    } = line.match(regex).groups;
    const result = compare(comparedName, condition, comparedAmount);
    if (result) {
      if (modifier === 'inc') map.set(name, map.get(name) + +modAmount);
      else map.set(name, map.get(name) - +modAmount);
      max = Math.max(map.get(name), max);
    }
  }

  return max;
};

console.log(solve1(data));
console.log(solve2(data));
