import { readFileSync } from 'fs';
const data = readFileSync('./2015/input/Day11.txt', { encoding: 'utf8' });

const passRule1 = (input) => {
  for (let i = 0; i < input.length - 2; i++) {
    const charCode1 = input[i].charCodeAt(0);
    const charCode2 = input[i + 1].charCodeAt(0);
    const charCode3 = input[i + 2].charCodeAt(0);

    if (charCode2 === charCode1 + 1 && charCode3 === charCode2 + 1) return true;
  }

  return false;
};

const passRule2 = (input) => !/[iol]/.test(input);

const passRule3 = (input) => {
  let pairs = [];

  for (let i = 0; i < input.length - 1; i++) {
    const char1 = input[i];
    const char2 = input[i + 1];
    if (char1 !== char2) continue;
    const pair = char1 + char2;
    if (pairs.length && !pairs.includes(pair)) return true;
    pairs.push(pair);
    i++;
  }

  return false;
};

const passRules = (input, rules) => {
  for (const rule of rules) if (!rule(input)) return false;

  return true;
};

const increasePassword = (input) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyza';
  let current = input.split('').reverse();

  for (let i = 0; i < current.length; i++) {
    const char = current[i];
    const idx = alpha.indexOf(char);
    current[i] = alpha[idx + 1];

    if (char !== 'z') break;
  }

  return current.reverse().join('');
};
const solve1 = (input) => {
  let current = input;

  while (!passRules(current, [passRule1, passRule2, passRule3]))
    current = increasePassword(current);

  return current;
};

const solve2 = (input) => {
  let current = solve1(input);
  current = increasePassword(current);
  return solve1(current);
};

console.log(solve1(data));
console.log(solve2(data));
