const fs = require('fs');
const data = fs.readFileSync('./2018/input/Day1.txt', { encoding: 'utf8' });

class Frequency {
  constructor() {
    this.frequency = 0;
  }

  adjust(num) {
    this.frequency += num;
  }

  getCurrent() {
    return this.frequency;
  }
}

const solve1 = (input) => {
  const frequency = new Frequency();
  for (const line of input.split('\n'))
    if (line.includes('+')) frequency.adjust(+line.slice(1));
    else frequency.adjust(+line);

  return frequency.getCurrent();
};

const solve2 = (input) => {
  const frequency = new Frequency();
  const visited = new Set();

  while (true) {
    for (const line of input.split('\n')) {
      if (line.includes('+')) frequency.adjust(+line.slice(1));
      else frequency.adjust(+line);
      const currentFrequency = frequency.getCurrent();
      if (visited.has(currentFrequency)) return currentFrequency;
      visited.add(currentFrequency);
    }
  }
};

console.log(solve1(data));
console.log(solve2(data));
