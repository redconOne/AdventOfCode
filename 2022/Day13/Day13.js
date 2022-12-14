const fs = require('fs');

const data = fs
  .readFileSync(__dirname + '/Day13.txt')
  .toString()
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const test = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const solve1 = (str) => {
  let valid = 0;
  let counter = 1;
  for (const packet of str.split('\n\n')) {
    const [left, right] = packet.split('\n').map((info) => JSON.parse(info));

    if (compare(left, right)) valid += counter;
    counter++;
  }

  return valid;
};

const compare = (l, r) => {
  //handle both nums
  if (typeof l === 'number' && typeof r === 'number') {
    if (l !== r) return l < r;
    else return undefined;
  }

  //handle one arr
  if (typeof l === 'number') return compare([l], r);
  if (typeof r === 'number') return compare(l, [r]);

  for (let i = 0, end = Math.max(l.length, r.length); i < end; ++i) {
    if (l[i] === undefined) return true;
    if (r[i] === undefined) return false;
    if (compare(l[i], r[i]) !== undefined) return compare(l[i], r[i]);
  }

  return undefined;
};

const solve2 = (str) => {
  return helper(str, [[[2]], [[6]]]);
};

const helper = (str, dividers) => {
  const thing = str
    .split('\n')
    .filter((item) => item)
    .map((item) => JSON.parse(item));

  thing.push(dividers[0]);
  thing.push(dividers[1]);

  thing.sort((a, b) => {
    const result = compare(a, b);
    if (result === undefined) return 0;
    return result ? -1 : 1;
  });

  return (thing.indexOf(dividers[0]) + 1) * (thing.indexOf(dividers[1]) + 1);
};

// console.log(solve1(test));
// console.log(solve1(data));

console.log(solve2(test));
console.log(solve2(data));
