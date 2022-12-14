const { checkPrime } = require('crypto');
const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day10.txt').toString();

const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const test = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`;

const solve1 = (str) => {
  var cycle = 0;
  var register = 1;
  const signals = [];
  var gogo = true;

  const checkCycle = () => {
    if (cycle === 20 && gogo) {
      gogo = !gogo;
      cycle = 0;
      signals.push(register * 20);
      return;
    }

    if (!gogo && cycle % 40 === 0) {
      signals.push(register * (cycle + 20));
    }
  };

  for (const line of str.split('\n')) {
    if (line === 'noop') {
      cycle++;
      checkCycle();
    } else {
      const value = +line.split(' ')[1];
      cycle++;
      checkCycle();
      cycle++;
      checkCycle();
      register += value;
    }

    console.log(register, cycle);
    console.log(signals);
  }

  return signals.slice(0, 6).reduce((sum, num) => sum + num, 0);
};

const solve2 = (str) => {
  var cycle = 0;
  const screen = [];
  var row = [];
  var sprite = 1;
  var counter = 1;

  const drawPixel = () => {
    cycle = cycle % 40;
    if (cycle === sprite || cycle === sprite + 1 || cycle === sprite + 2) {
      screen.push('#');
    } else screen.push('.');
  };

  for (const line of str.split('\n')) {
    console.log(cycle, sprite, line);
    if (line === 'noop') {
      cycle++;
      drawPixel();
    } else {
      cycle++;
      drawPixel();
      cycle++;
      drawPixel();
      sprite += +line.split(' ')[1];
    }
  }

  const newScreen = [];
  for (let i = 0; i < screen.length; i += 40) {
    newScreen.push(screen.slice(i, i + 40).join(''));
  }

  console.log(newScreen);

  return newScreen.join('\n');
};

// console.log(solve1(test));

// console.log(solve1(input))

// console.log(solve2(test));

console.log(solve2(input));
