const fs = require('fs');
const data = fs.readFileSync('./2017/input/Day2.txt', { encoding: 'utf8' });

const solve1 = (input) => {
  const reg = /(\d+)/g;
  let total = 0;

  for (const line of input.split('\n')) {
    const group = line.match(reg);
    const min = Math.min(...group);
    const max = Math.max(...group);
    total += max - min;
  }

  return total;
};

const solve2 = (input) => {
  const reg = /(\d+)/g;
  let total = 0;

  for (const line of input.split('\n')) {
    const group = line.match(reg);

    for (let i = 0; i < group.length; i++) {
      const currentNum = group[i];
      const before = group.slice(0, i);
      const after = group.slice(i + 1);
      const others = before.concat(after);
      let stop = false;

      for (const num of others) {
        if (num % currentNum === 0) {
          total += num / currentNum;
          stop = true;
          break;
        }
      }
      if (stop) break;
    }
  }

  return total;
};

console.log(solve1(data));
console.log(solve2(data));
