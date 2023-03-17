const fs = require('fs');

const data = fs
  .readFileSync('./2015/Day5/Day5.txt', { encoding: 'utf-8' })
  .replace(/\r/g, '')
  .trim();

const solve1 = (str) => {
  let result = 0;

  for (const word of str.split('\n')) if (isNice(word)) result++;

  return result;
};

const isNice = (str) => {
  let vowels = 0;
  let doubles = false;
  let specials = false;

  for (let i = 0; i < str.length; ++i) {
    if (/[aeiou]/.test(str[i])) vowels++;
    if (str[i] === str[i + 1]) doubles = true;
  }

  if (/ab|cd|pq|xy/.test(str)) specials = true;

  console.log(str, specials);
  return vowels >= 3 && doubles && !specials;
};

const test = `ugknbfddgicrmopn
aaa
jchzalrnumimnmhp
haegwjzuvuyypxyu
dvszwmarrgswjxmb`;

// console.log(solve1(test));
console.log(solve1(data));

const solve2 = (str) => {
  let total = 0;

  for (const word of str.split('\n')) if (isActuallyNice(word)) total++;

  return total;
};

const isActuallyNice = (str) => {
  let pairs = {};
  let hasPair = false;

  for (let i = 0; i < str.length; i++) {
    const currentPair = str.slice(i, i + 2);
    if (pairs[currentPair]) {
      console.log(currentPair, pairs[currentPair]);
      for (const endpoint of pairs[currentPair])
        if (endpoint < i) {
          hasPair = true;
          break;
        }
      pairs[currentPair].push[i + 1];
    } else pairs[currentPair] = [i + 1];
  }

  if (!hasPair) return false;

  for (let i = 0; i < str.length - 2; i++) {
    const substr = str.slice(i, i + 3);
    if (substr[0] === substr[2]) {
      return true;
    }
  }

  return false;
};

const test2 = `qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy
qhirixgwkkccuzlp
qpnxkuldeiituggg
aaaabcdxyxefga
`;

console.log(solve2(test2));
console.log(solve2(data));
