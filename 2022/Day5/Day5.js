const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day5.txt').toString();

const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const solve1 = (arr, container) => {
  for (line of arr.split('\n')) {
    const task = line.split(' ');

    for (let i = 0; i < +task[1]; i++) {
      container[+task[5] - 1].push(container[+task[3] - 1].pop());
    }
  }

  const result = container.map((item) => item.pop());

  return result.join('');
};

const solve2 = (arr, container) => {
  for (line of arr.split('\n')) {
    const task = line.split(' ');

    const temp = [];
    for (let i = 0; i < +task[1]; i++) {
      temp.push(container[+task[3] - 1].pop());
    }
    while (temp.length) container[+task[5] - 1].push(temp.pop());
  }

  const result = container.map((item) => item.pop());

  return result.join('');
};

const test = [['Z', 'N'], ['M', 'C', 'D'], ['P']];
const testInstructions = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const crateArr = [
  'bsvzgpw',
  'jvbczf',
  'vlmhnzdc',
  'ldmzpfjb',
  'vfcgjbqh',
  'ghqtslb',
  'lgczv',
  'nlg',
  'jfhc',
].map((item) => item.toUpperCase().split(''));

const strArr = [
  'ZTFRWJG',
  'MWG',
  'JNHG',
  'JRCNW',
  'WFSBGQVM',
  'SRTDVWC',
  'HBNCDZGV',
  'SJNMGC',
  'GPNWCJDL',
];
const cratesArr = strArr.map((item) => item.split(''));
// console.log('Solve 1 test :', solve1(testInstructions, test));
// console.log(solve1(input, crateArr));

console.log('Solve 2 :', solve2(testInstructions, test));
console.log(solve2(input, crateArr));
