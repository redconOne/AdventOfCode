const fs = require('fs');
const data = fs.readFileSync('./2015/input/Day13.txt', { encoding: 'utf8' });

const createMap = (input) => {
  const map = new Map();
  const regex =
    /(?<guest1>\w+) would (?<operation>\w+) (?<happiness>\d+) happiness units by sitting next to (?<guest2>\w+)./;

  for (const line of input.split('\n')) {
    const { guest1, operation, happiness, guest2 } = line.match(regex).groups;
    const first = `${guest1}->${guest2}`;
    map.set(first, operation === 'gain' ? +happiness : 0 - +happiness);
  }

  return map;
};

const createGuestList = (input) => {
  const set = new Set();
  const regex =
    /(?<guest1>\w+) would (?<operation>\w+) (?<happiness>\d+) happiness units by sitting next to (?<guest2>\w+)./;

  for (const line of input.split('\n')) {
    const { guest1, guest2 } = line.match(regex).groups;
    set.add(guest1);
    set.add(guest2);
  }

  return Array.from(set);
};

const permute = (input) => {
  if (!input.length) return [[]];
  const permutations = [];

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    const others = input.slice(0, i).concat(input.slice(i + 1));
    const otherPermutes = permute(others);

    for (let j = 0; j < otherPermutes.length; j++) {
      const permutation = [current].concat(otherPermutes[j]);
      permutations.push(permutation);
    }
  }

  return permutations;
};

const calculateHappiness = (input, map) => {
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    const guest1 = input[i];
    const guest2 = input[i + 1] || input[0];
    const num1 = map.get(`${guest1}->${guest2}`);
    const num2 = map.get(`${guest2}->${guest1}`);
    total += num1 + num2;
  }

  return total;
};

const solve1 = (input) => {
  const map = createMap(input);
  const guestList = createGuestList(input);
  const possibleSeating = permute(guestList);

  console.log(map);

  let maxHappiness = 0;

  for (const arrangement of possibleSeating) {
    const currentHappiness = calculateHappiness(arrangement, map);
    maxHappiness = Math.max(currentHappiness, maxHappiness);
  }

  return maxHappiness;
};

const solve2 = (input) => {
  let guestList = createGuestList(input);
  let instructions = input;

  for (const guest of guestList)
    instructions += `\n${guest} would gain 0 happiness units by sitting next to Ming.\nMing would gain 0 happiness units by sitting next to ${guest}.`;

  return solve1(instructions);
};

console.log(solve1(data));
console.log(solve2(data));
