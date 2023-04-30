import { readFileSync } from 'fs';
const data = readFileSync('./2017/input/Day7.txt', { encoding: 'utf8' });

class Program {
  constructor(input) {
    let regex;

    if (input.includes('->')) {
      regex =
        /(?<programName>\w+) \((?<programWeight>\d+)\) -> (?<balancingPrograms>.*)/;
      let { programName, programWeight, balancingPrograms } =
        input.match(regex).groups;
      this.name = programName;
      this.weight = +programWeight;
      this.balancing = balancingPrograms.split(',').map((x) => x.trim());
    } else {
      regex = /(?<programName>\w+) \((?<programWeight>\d+)\)/;
      let { programName, programWeight } = input.match(regex).groups;
      this.name = programName;
      this.weight = +programWeight;
      this.balancing = [];
    }
  }
}

const solve1 = (input) => {
  const programs = [];
  const possibleRoots = [];

  for (const line of input.split('\n')) programs.push(new Program(line));
  for (const program of programs) possibleRoots.push(program.name);

  for (const possibleRoot of possibleRoots) {
    let found = false;
    for (const program of programs) {
      if (program.balancing.includes(possibleRoot)) {
        found = true;
        break;
      }
    }
    if (!found) return possibleRoot;
  }

  return -1;
};

const solve2 = (input) => {
  const programs = [];
  const names = [];
  const weights = new Map();

  for (const line of input.split('\n')) programs.push(new Program(line));
  for (const program of programs) names.push(program.name);
  for (const program of programs)
    if (!program.balancing.length) weights.set(program.name, program.weight);

  let balancingComplete = false;
  const unbalanced = [];

  while (!balancingComplete) {
    balancingComplete = true;

    for (const program of programs) {
      let currentBalanced = true;
      for (const disc of program.balancing) {
        if (!weights.has(disc)) {
          balancingComplete = false;
          currentBalanced = false;
        }
      }
      if (currentBalanced) {
        for (let i = 0; i < program.balancing.length; i++) {
          const current = program.balancing[i];
          const next = program.balancing[i + 1] || program.balancing[0];
          if (weights.get(current) !== weights.get(next))
            unbalanced.push(program);
        }

        const currentBalance = program.balancing.reduce(
          (sum, num) => sum + weights.get(num),
          0
        );
        weights.set(program.name, program.weight + currentBalance);
      }
    }
  }

  const unbalancedProgram = unbalanced[0];
  let unbalancedDisc;
  let balancedDisc;
  for (let i = 0; i < unbalancedProgram.balancing.length; i++) {
    const current = unbalancedProgram.balancing[i];
    const next =
      unbalancedProgram.balancing[i + 1] || unbalancedProgram.balancing[0];
    if (weights.get(current) !== weights.get(next)) {
      unbalancedDisc = current;
      balancedDisc = next;
    }
  }

  const difference = weights.get(unbalancedDisc) - weights.get(balancedDisc);

  let lastUnbalanced;

  for (const program of programs)
    if (program.name === unbalancedDisc) lastUnbalanced = program.weight;

  return lastUnbalanced - difference;
};

console.log(solve1(data));
console.log(solve2(data));
