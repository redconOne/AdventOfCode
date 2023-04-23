import { readFileSync } from 'fs';
const data = readFileSync('./2017/input/Day6.txt', { encoding: 'utf8' })
  .replace(/\r/g, '')
  .replace(/\t/g, ' ')
  .trim();

class MemoryBank {
  constructor(input) {
    this.banks = input.split(' ').map(Number);
    this.visited = new Map();
  }

  biggestBank() {
    let max = 0;
    for (const bank of this.banks) max = Math.max(bank, max);

    return this.banks.indexOf(max);
  }

  redistribute(location) {
    let currentBank = this.banks[location];
    let currentLocation = location + 1;
    this.banks[location] = 0;
    while (currentBank) {
      this.banks[currentLocation % this.banks.length]++;
      currentBank--;
      currentLocation++;
    }
  }

  hasVisited(cycle = 1) {
    const current = this.banks.join('-');
    if (this.visited.has(current)) return true;
    this.visited.set(current, cycle);
    return false;
  }

  visitedOnCycle() {
    const current = this.banks.join('-');
    return this.visited.get(current);
  }
}

const solve1 = (input) => {
  const memoryBank = new MemoryBank(input);
  let cycles = 0;

  while (!memoryBank.hasVisited()) {
    const biggestLocation = memoryBank.biggestBank();
    memoryBank.redistribute(biggestLocation);
    cycles++;
  }

  return cycles;
};

const solve2 = (input) => {
  const memoryBank = new MemoryBank(input);
  let cycles = 0;

  while (!memoryBank.hasVisited(cycles)) {
    const biggestLocation = memoryBank.biggestBank();
    memoryBank.redistribute(biggestLocation);
    cycles++;
  }

  return cycles - memoryBank.visitedOnCycle();
};

console.log(solve1(data));
console.log(solve2(data));
