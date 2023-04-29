const fs = require('fs');
const data = fs.readFileSync('./2016/input/Day10.txt', { encoding: 'utf-8' });

class Bot {
  constructor() {
    this.low = undefined;
    this.high = undefined;
    this.lowTo = undefined;
    this.highTo = undefined;
    this.ready = 0;
  }
  addInstructions(low, high) {
    this.lowTo = low;
    this.highTo = high;
  }
  addChip(newChip) {
    this.ready++;
    if (this.low === undefined) {
      this.low = newChip;
      return;
    }
    if (this.low < newChip) {
      this.high = newChip;
      return;
    }
    if (this.low > newChip) {
      this.high = this.low;
      this.low = newChip;
    }
  }
  operate() {
    if (this.ready < 2) return undefined;

    const result = [
      [this.lowTo, this.low],
      [this.highTo, this.high],
    ];
    this.ready = 0;
    this.low = undefined;
    this.high = undefined;
    return result;
  }
}

const solve1 = (input) => {
  const bots = [];
  const instructions = [];
  const output = new Array(21);
  const comparisons = [];
  const target1 = 61;
  const target2 = 17;
  for (let i = 0; i < output.length; i++) output[i] = [];

  for (let i = 0; i <= 209; i++) {
    const bot = new Bot();
    bots.push(bot);
  }

  for (const line of input.split('\n')) {
    if (!line.includes('gives')) {
      instructions.push(line);
      continue;
    }
    const regex =
      /bot (?<targetNum>\w+) gives low to (?<lowDestination>\w+) (?<lowNum>\d+) and high to (?<highDestination>\w+) (?<highNum>\d+)/;
    const { targetNum, lowDestination, lowNum, highDestination, highNum } =
      line.match(regex).groups;
    const instruction1 = { target: lowDestination, idx: +lowNum };
    const instruction2 = { target: highDestination, idx: +highNum };
    bots[+targetNum].addInstructions(instruction1, instruction2);
  }

  const helper = () => {
    let counter = 0;
    for (const bot of bots) {
      counter++;
      const result = bot.operate();
      if (result === undefined) continue;
      const firstInst = result[0][0];
      const firstVal = result[0][1];
      const secondInst = result[1][0];
      const secondVal = result[1][1];

      if (
        (firstVal === target1 && secondVal === target2) ||
        (firstVal === target2 && secondVal === target1)
      )
        comparisons.push(counter - 1);

      if (firstInst.target === 'output') output[firstInst.idx].push(firstVal);
      else bots[firstInst.idx].addChip(firstVal);
      if (secondInst.target === 'output')
        output[secondInst.idx].push(secondVal);
      else bots[secondInst.idx].addChip(secondVal);
      return true;
    }
    return false;
  };

  for (const line of instructions) {
    const regex = /value (?<value>\d+) goes to bot (?<botNum>\d+)/;
    const { value, botNum } = line.match(regex).groups;
    bots[+botNum].addChip(+value);
    let gogo = true;
    while (gogo) {
      gogo = helper();
    }
  }

  return comparisons[0];
};

const solve2 = (input) => {
  const bots = [];
  const instructions = [];
  const output = new Array(21);
  const comparisons = [];
  const target1 = 61;
  const target2 = 17;
  for (let i = 0; i < output.length; i++) output[i] = [];

  for (let i = 0; i <= 209; i++) {
    const bot = new Bot();
    bots.push(bot);
  }

  for (const line of input.split('\n')) {
    if (!line.includes('gives')) {
      instructions.push(line);
      continue;
    }
    const regex =
      /bot (?<targetNum>\w+) gives low to (?<lowDestination>\w+) (?<lowNum>\d+) and high to (?<highDestination>\w+) (?<highNum>\d+)/;
    const { targetNum, lowDestination, lowNum, highDestination, highNum } =
      line.match(regex).groups;
    const instruction1 = { target: lowDestination, idx: +lowNum };
    const instruction2 = { target: highDestination, idx: +highNum };
    bots[+targetNum].addInstructions(instruction1, instruction2);
  }

  const helper = () => {
    let counter = 0;
    for (const bot of bots) {
      counter++;
      const result = bot.operate();
      if (result === undefined) continue;
      const firstInst = result[0][0];
      const firstVal = result[0][1];
      const secondInst = result[1][0];
      const secondVal = result[1][1];

      if (
        (firstVal === target1 && secondVal === target2) ||
        (firstVal === target2 && secondVal === target1)
      )
        comparisons.push(counter - 1);

      if (firstInst.target === 'output') output[firstInst.idx].push(firstVal);
      else bots[firstInst.idx].addChip(firstVal);
      if (secondInst.target === 'output')
        output[secondInst.idx].push(secondVal);
      else bots[secondInst.idx].addChip(secondVal);
      return true;
    }
    return false;
  };

  for (const line of instructions) {
    const regex = /value (?<value>\d+) goes to bot (?<botNum>\d+)/;
    const { value, botNum } = line.match(regex).groups;
    bots[+botNum].addChip(+value);
    let gogo = true;
    while (gogo) {
      gogo = helper();
    }
  }

  return output.slice(0, 3).reduce((prod, num) => prod * num[0], 1);
};

console.log(solve1(data));
console.log(solve2(data));
