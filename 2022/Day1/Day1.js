const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day1.txt').toString();
const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const solution1 = (str) => {
  let max = 0,
    current = 0;

  for (const line of str.split('\n')) {
    if (line === '') {
      max = max > current ? max : current;
      current = 0;
    } else current += +line;
  }

  return max > current ? max : current;
};

const solution2 = (str) => {
  let topThree = [],
    current = 0;
  for (const line of str.split('\n')) {
    if (line === '') {
      adjust(topThree, current);
      current = 0;
    } else {
      current += +line;
    }
  }

  return topThree.reduce((sum, num) => sum + num, 0);
};

const adjust = (arr, num) => {
  if (arr.length < 3) {
    arr.push(num);
    arr.sort((a, b) => b - a);
    return;
  }

  if (arr[0] < num) {
    arr.unshift(num);
    arr.pop();
    return;
  }
  if (arr[1] < num) {
    arr[2] = arr[1];
    arr[1] = current;
    return;
  }
  if (arr[2] < num) {
    arr.pop();
    arr.push(num);
    return;
  }

  return;
};

const test = `1000

2000
3000

4000

5000
6000

7000
8000
9000

10000`;

console.log('Test 1 expect: ' + solution1(test) + ' to be 24000');
console.log('Test 2 expect: ' + solution2(test) + ' to be 40000');
console.log('Solution 1:' + solution1(input));
console.log('Solution 2:' + solution2(input));
