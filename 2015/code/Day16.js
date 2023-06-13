import { readFileSync } from 'fs';

const data = readFileSync('./2015/input/Day16.txt', { encoding: 'utf-8' });

class AuntSue {
  constructor({
    sueNum,
    children = -1,
    cats = -1,
    samoyeds = -1,
    pomeranians = -1,
    akitas = -1,
    vizslas = -1,
    goldfish = -1,
    trees = -1,
    cars = -1,
    perfumes = -1,
  }) {
    this.sueNum = +sueNum;
    this.children = +children;
    this.cats = +cats;
    this.samoyeds = +samoyeds;
    this.pomeranians = +pomeranians;
    this.akitas = +akitas;
    this.vizslas = +vizslas;
    this.goldfish = +goldfish;
    this.trees = +trees;
    this.cars = +cars;
    this.perfumes = +perfumes;
  }
  isValid(num1, num2) {
    return num1 === num2 || num1 === -1;
  }
  compare(target) {
    for (const key in target)
      if (key === 'sueNum') continue;
      else if (!this.isValid(this[key], target[key])) return false;
    return true;
  }
  isGreater(num1, num2) {
    return num1 > num2 || num1 === -1;
  }
  isFewer(num1, num2) {
    return num1 < num2 || num1 === -1;
  }
  realCompare(target) {
    for (const key in target)
      switch (key) {
        case 'sueNum':
          continue;
          break;
        case 'cats':
          if (!this.isGreater(this.cats, target.cats)) return false;
          break;
        case 'trees':
          if (!this.isGreater(this.trees, target.trees)) return false;
          break;
        case 'pomeranians':
          if (!this.isFewer(this.pomeranians, target.pomeranians)) return false;
          break;
        case 'goldfish':
          if (!this.isFewer(this.goldfish, target.goldfish)) return false;
          break;
        default:
          if (!this.isValid(this[key], target[key])) return false;
      }
    return true;
  }
}

const solve1 = (input) => {
  const sues = [];
  const regex =
    /Sue (?<sueNum>\d+): (?<type1>\w+): (?<amount1>\d+), (?<type2>\w+): (?<amount2>\d+), (?<type3>\w+): (?<amount3>\d+)/;
  for (const line of input.split('\n')) {
    const { sueNum, type1, type2, type3, amount1, amount2, amount3 } =
      line.match(regex).groups;

    const sue = { sueNum };
    sue[type1] = +amount1;
    sue[type2] = +amount2;
    sue[type3] = +amount3;

    sues.push(new AuntSue(sue));
  }

  const targetVals = { sueNum: 999 };
  targetVals.children = 3;
  targetVals.cats = 7;
  targetVals.samoyeds = 2;
  targetVals.pomeranians = 3;
  targetVals.akitas = 0;
  targetVals.vizslas = 0;
  targetVals.goldfish = 5;
  targetVals.trees = 3;
  targetVals.cars = 2;
  targetVals.perfumes = 1;

  const targetSue = new AuntSue(targetVals);

  const resultSue = sues.filter((sue) => sue.compare(targetSue))[0];

  return resultSue.sueNum;
};
const solve2 = (input) => {
  const sues = [];
  const regex =
    /Sue (?<sueNum>\d+): (?<type1>\w+): (?<amount1>\d+), (?<type2>\w+): (?<amount2>\d+), (?<type3>\w+): (?<amount3>\d+)/;
  for (const line of input.split('\n')) {
    const { sueNum, type1, type2, type3, amount1, amount2, amount3 } =
      line.match(regex).groups;

    const sue = { sueNum };
    sue[type1] = +amount1;
    sue[type2] = +amount2;
    sue[type3] = +amount3;

    sues.push(new AuntSue(sue));
  }

  const targetVals = { sueNum: 999 };
  targetVals.children = 3;
  targetVals.cats = 7;
  targetVals.samoyeds = 2;
  targetVals.pomeranians = 3;
  targetVals.akitas = 0;
  targetVals.vizslas = 0;
  targetVals.goldfish = 5;
  targetVals.trees = 3;
  targetVals.cars = 2;
  targetVals.perfumes = 1;

  const targetSue = new AuntSue(targetVals);

  const resultSue = sues.filter((sue) => sue.realCompare(targetSue))[0];

  return resultSue.sueNum;
};

console.log(solve1(data));
console.log(solve2(data));
