const fs = require('fs');
const data = fs.readFileSync('./2016/input/Day6.txt', { encoding: 'utf8' });

class Message {
  constructor() {
    this.arr = [];
  }
  addRow(input) {
    for (const idx in input) {
      if (this.arr[idx] === undefined) this.arr[idx] = input[idx];
      else this.arr[idx] += input[idx];
    }
  }
  mostFrequent(row) {
    const dict = {};

    for (const char of row)
      if (dict[char]) dict[char]++;
      else dict[char] = 1;

    let maxChar = '';
    let maxNum = 0;

    for (const key in dict)
      if (dict[key] > maxNum) {
        maxNum = dict[key];
        maxChar = key;
      }

    return maxChar;
  }
  getWord() {
    let str = '';

    for (const row of this.arr) str += this.mostFrequent(row);

    return str;
  }
  leastFrequent(row) {
    const dict = {};

    for (const char of row)
      if (dict[char]) dict[char]++;
      else dict[char] = 1;

    let minNum = Infinity;
    let minChar = '';

    for (const key in dict)
      if (dict[key] < minNum) {
        minNum = dict[key];
        minChar = key;
      }

    return minChar;
  }
  getSpecialWord() {
    let str = '';

    for (const row of this.arr) str += this.leastFrequent(row);

    return str;
  }
}

const solve1 = (input) => {
  const msg = new Message();

  for (const row of input.split('\n')) msg.addRow(row);

  return msg.getWord();
};

const solve2 = (input) => {
  const msg = new Message();

  for (const row of input.split('\n')) msg.addRow(row);

  return msg.getSpecialWord();
};

console.log(solve1(data));
console.log(solve2(data));
