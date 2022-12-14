const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day3.txt').toString();

const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const solve1 = (str) => {
  let values = [];
  const letters = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (const line of str.split('\n')) {
    const first = line.slice(0, line.length / 2);
    const second = line.slice(line.length / 2);

    const firstSet = new Set(first.split(''));
    const secondSet = new Set(second.split(''));

    for (const char of firstSet)
      if (secondSet.has(char)) {
        values.push(char);
        break;
      }
  }
  console.log(values);
  values = values.map((item) => letters.indexOf(item));

  return values.reduce((sum, num) => sum + num);
};

const solve2 = (str) => {
  const letters = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let values = [];
  let sets = [];

  for (const line of str.split('\n')) {
    console.log(line);
    if (sets.length >= 3) {
      for (const char of sets[0]) {
        if (sets[1].has(char) && sets[2].has(char)) {
          values.push(char);
          sets.pop();
          sets.pop();
          sets.pop();
          sets.push(new Set(line.split('')));
          break;
        }
      }
    } else {
      sets.push(new Set(line.split('')));
    }
  }
  console.log(sets);
  for (const char of sets[0])
    if (sets[1].has(char) && sets[2].has(char)) values.push(char);

  console.log(values);

  values = values.map((item) => letters.indexOf(item));

  return values.reduce((sum, num) => sum + num);
};

const test = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

console.log('Solve 1 :', solve1(test), ' ');
console.log(solve1(input));

console.log('Solve 2 :', solve2(test), ' ');
console.log(solve2(input));

console.log(ruckSack(test));
console.log(ruckSack(input));

function ruckSack(inp) {
  const priority = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  // 1-26 and 27-52
  let items = inp
    .split('\n')
    .map(
      (value) =>
        `${[value.slice(0, value.length / 2)]},${[
          value.slice(value.length / 2),
        ]}`
    )
    .map((value) => value.split(','));

  let shared = [];
  items.map((value) => {
    let ruck1 = value[0].split('');
    let ruck2 = value[1].split('');
    shared.push(ruck1.find((letter) => ruck2.includes(letter)));
  });

  console.log(shared);
  return shared.reduce((total, value) => total + priority.indexOf(value), 0);
}
