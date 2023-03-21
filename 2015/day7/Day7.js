const fs = require('fs');

const data = fs
  .readFileSync('./2015/Day7/Day7.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim();
const andGate = (c1, c2) => {
  let result = '';
  let max = Math.max(c1.length, c2.length);
  let temp1 = c1.split('').reverse().join('');
  let temp2 = c2.split('').reverse().join('');

  for (let i = 0; i < max; i++) {
    let b1 = +temp1[i] || 0;
    let b2 = +temp2[i] || 0;
    result += b1 && b2 ? 1 : 0;
  }

  result = +result.split('').reverse().join('');
  return result.toString();
};

const orGate = (c1, c2) => {
  let result = '';
  let max = Math.max(c1.length, c2.length);
  let temp1 = c1.split('').reverse().join('');
  let temp2 = c2.split('').reverse().join('');

  for (let i = 0; i < max; i++) {
    let b1 = +temp1[i] || 0;
    let b2 = +temp2[i] || 0;
    result += b1 || b2 ? 1 : 0;
  }

  result = +result.split('').reverse().join('');
  return result.toString();
};

const leftShift = (c1, shift) => {
  return c1 + '0'.repeat(shift);
};

const rightShift = (c1, shift) => {
  return c1.slice(0, c1.length - shift);
};

const notGate = (c1) => {
  let temp = parseInt(c1, 2);
  let result = 65535 - temp;
  return result.toString(2);
};

const solve1 = (str) => {
  let dict = {};
  let counter = 200;
  let instructions = str.split('\n').reverse();
  let remaining = [];

  while (!dict['a']) {
    while (instructions.length) {
      const instruction = instructions.pop();

      if (instruction.includes(' AND ')) {
        const regex = /(?<circuit1>.*) AND (?<circuit2>.*) -> (?<key>.*)/;
        const { circuit1, circuit2, key } = instruction.match(regex).groups;
        const c1 = /[a-z]/gi.test(circuit1)
          ? dict[circuit1]
          : parseInt(circuit1).toString(2);
        const c2 = /[a-z]/gi.test(circuit2)
          ? dict[circuit2]
          : parseInt(circuit2).toString(2);
        if (c1 && c2) dict[key] = andGate(c1, c2);
        else remaining.push(instruction);
        continue;
      }

      if (instruction.includes(' OR')) {
        const regex = /(?<circuit1>.*) OR (?<circuit2>.*) -> (?<key>.*)/;
        const { circuit1, circuit2, key } = instruction.match(regex).groups;
        const c1 = /[a-z]/gi.test(circuit1)
          ? dict[circuit1]
          : parseInt(circuit1).toString(2);
        const c2 = /[a-z]/gi.test(circuit2)
          ? dict[circuit2]
          : parseInt(circuit2).toString(2);
        if (c1 && c2) dict[key] = orGate(c1, c2);
        else remaining.push(instruction);
        continue;
      }

      if (instruction.includes(' LSHIFT ')) {
        const regex = /(?<circuit1>.*) LSHIFT (?<shiftAmount>.*) -> (?<key>.*)/;
        const { circuit1, shiftAmount, key } = instruction.match(regex).groups;
        const c1 = dict[circuit1];
        if (c1) dict[key] = leftShift(c1, +shiftAmount);
        else remaining.push(instruction);
        continue;
      }

      if (instruction.includes(' RSHIFT ')) {
        const regex = /(?<circuit1>.*) RSHIFT (?<shiftAmount>.*) -> (?<key>.*)/;
        const { circuit1, shiftAmount, key } = instruction.match(regex).groups;
        const c1 = dict[circuit1];
        if (c1) dict[key] = rightShift(c1, +shiftAmount);
        else remaining.push(instruction);
        continue;
      }

      if (instruction.includes('NOT ')) {
        const regex = /NOT (?<circuit1>.*) -> (?<key>.*)/;
        const { circuit1, key } = instruction.match(regex).groups;
        const c1 = dict[circuit1];
        if (c1) dict[key] = notGate(c1);
        else remaining.push(instruction);
        continue;
      }

      const regex = /(?<value>.*) -> (?<key>.*)/;
      const { value, key } = instruction.match(regex).groups;
      if (/[a-z]/gi.test(value)) {
        if (dict[value]) dict[key] = dict[value];
        else remaining.push(instruction);
      } else dict[key] = (+value).toString(2);
    }

    instructions = remaining;
    remaining = [];

    counter--;
    if (!counter) break;
  }

  console.log(instructions);
  console.log(dict);

  return dict['a'];
};
const test1 = `d AND e -> l
d OR e -> m
m LSHIFT 2 -> o
o RSHIFT 2 -> p
NOT p -> q
x AND q -> a
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;

// console.log(solve1(test1));
// console.log(parseInt(solve1(data), 2));

const solve2 = (str) => {
  let dict = {};
  let counter = 200;
  let instructions = str.split('\n').reverse();
  let remaining = [];

  while (!dict['a']) {
    while (instructions.length) {
      const instruction = instructions.pop();

      if (instruction.includes(' AND ')) {
        const regex = /(?<circuit1>.*) AND (?<circuit2>.*) -> (?<key>.*)/;
        const { circuit1, circuit2, key } = instruction.match(regex).groups;
        const c1 = /[a-z]/gi.test(circuit1)
          ? dict[circuit1]
          : parseInt(circuit1).toString(2);
        const c2 = /[a-z]/gi.test(circuit2)
          ? dict[circuit2]
          : parseInt(circuit2).toString(2);
        if (c1 && c2) dict[key] = andGate(c1, c2);
        else remaining.push(instruction);
        continue;
      }

      if (instruction.includes(' OR')) {
        const regex = /(?<circuit1>.*) OR (?<circuit2>.*) -> (?<key>.*)/;
        const { circuit1, circuit2, key } = instruction.match(regex).groups;
        const c1 = /[a-z]/gi.test(circuit1)
          ? dict[circuit1]
          : parseInt(circuit1).toString(2);
        const c2 = /[a-z]/gi.test(circuit2)
          ? dict[circuit2]
          : parseInt(circuit2).toString(2);
        if (c1 && c2) dict[key] = orGate(c1, c2);
        else remaining.push(instruction);
        continue;
      }

      if (instruction.includes(' LSHIFT ')) {
        const regex = /(?<circuit1>.*) LSHIFT (?<shiftAmount>.*) -> (?<key>.*)/;
        const { circuit1, shiftAmount, key } = instruction.match(regex).groups;
        const c1 = dict[circuit1];
        if (c1) dict[key] = leftShift(c1, +shiftAmount);
        else remaining.push(instruction);
        continue;
      }

      if (instruction.includes(' RSHIFT ')) {
        const regex = /(?<circuit1>.*) RSHIFT (?<shiftAmount>.*) -> (?<key>.*)/;
        const { circuit1, shiftAmount, key } = instruction.match(regex).groups;
        const c1 = dict[circuit1];
        if (c1) dict[key] = rightShift(c1, +shiftAmount);
        else remaining.push(instruction);
        continue;
      }

      if (instruction.includes('NOT ')) {
        const regex = /NOT (?<circuit1>.*) -> (?<key>.*)/;
        const { circuit1, key } = instruction.match(regex).groups;
        const c1 = dict[circuit1];
        if (c1) dict[key] = notGate(c1);
        else remaining.push(instruction);
        continue;
      }

      const regex = /(?<value>.*) -> (?<key>.*)/;
      const { value, key } = instruction.match(regex).groups;
      if (key === 'b') {
        dict[key] = (46065).toString(2);
        continue;
      }
      if (/[a-z]/gi.test(value)) {
        if (dict[value]) dict[key] = dict[value];
        else remaining.push(instruction);
      } else dict[key] = (+value).toString(2);
    }

    instructions = remaining;
    remaining = [];

    counter--;
    if (!counter) break;
  }

  return parseInt(dict['a'], 2);
};

console.log(parseInt(solve2(data)));
