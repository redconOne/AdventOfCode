import { readFileSync } from 'fs';
const data = readFileSync('./2017/input/Day4.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim();

class Passphrase {
  constructor(input) {
    this.words = input.split(' ');
  }

  allUnique(arr = this.words) {
    for (const word of arr)
      if (arr.indexOf(word) !== arr.lastIndexOf(word)) return false;
    return true;
  }

  noAnagrams() {
    const sorted = this.words.map((word) => word.split('').sort().join(''));
    return this.allUnique(sorted);
  }
}

const solve1 = (input) => {
  const passphrases = [];
  for (const line of input.split('\n')) passphrases.push(new Passphrase(line));

  const validphrases = [];

  for (const phrase of passphrases)
    if (phrase.allUnique()) validphrases.push(phrase);

  console.log(validphrases);

  return validphrases.length;
};

const solve2 = (input) => {
  const passphrases = [];
  for (const line of input.split('\n')) passphrases.push(new Passphrase(line));

  const validPhrases = [];

  for (const phrase of passphrases)
    if (phrase.noAnagrams()) validPhrases.push(phrase);

  return validPhrases.length;
};

console.log(solve1(data));
console.log(solve2(data));
