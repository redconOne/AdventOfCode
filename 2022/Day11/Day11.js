const fs = require('fs');

const data = fs.readFileSync(__dirname + '/Day11.txt').toString();

const input = data
  .split('\n')
  .map((item) => item.trim())
  .join('\n');

const test = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1
`;

const solve1 = (str) => {
  const monkeys = [];

  for (const monkeyLines of str.split('\n\n')) {
    const monkey = monkeyLines.split('\n');
    const monkeyItems = monkey[1].split(':')[1].split(',').map(Number);
    const monkeyTest = +monkey[3].split(' ')[3];
    const monkeyTrue = +monkey[4].trim().split(' ')[5];
    const monkeyFalse = +monkey[5].trim().split(' ')[5];

    monkeys.push({
      items: monkeyItems,
      test: monkeyTest,
      ifTrue: monkeyTrue,
      ifFalse: monkeyFalse,
      inspections: 0,
    });
  }

  //   monkeys[0].operation = (num) => num * 19;
  //   monkeys[1].operation = (num) => num + 6;
  //   monkeys[2].operation = (num) => num * num;
  //   monkeys[3].operation = (num) => num + 3;

  monkeys[0].operation = (num) => num * 2;
  monkeys[1].operation = (num) => num + 3;
  monkeys[2].operation = (num) => num + 6;
  monkeys[3].operation = (num) => num + 5;
  monkeys[4].operation = (num) => num + 8;
  monkeys[5].operation = (num) => num * 5;
  monkeys[6].operation = (num) => num * num;
  monkeys[7].operation = (num) => num + 4;

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      for (let item of monkey.items) {
        let worry = monkey.operation(item);
        worry = Math.floor(worry / 3);

        if (worry % monkey.test === 0) monkeys[monkey.ifTrue].items.push(worry);
        else monkeys[monkey.ifFalse].items.push(worry);
        monkey.inspections++;
      }
      monkey.items = [];
    }
  }

  monkeys.sort((a, b) => b.inspections - a.inspections);

  return monkeys[0].inspections * monkeys[1].inspections;
};

const solve2 = (str) => {
  const monkeys = [];

  for (const monkeyLines of str.split('\n\n')) {
    const monkey = monkeyLines.split('\n');
    const monkeyItems = monkey[1].split(':')[1].split(',').map(Number);
    const monkeyTest = +monkey[3].split(' ')[3];
    const monkeyTrue = +monkey[4].trim().split(' ')[5];
    const monkeyFalse = +monkey[5].trim().split(' ')[5];

    monkeys.push({
      items: monkeyItems,
      test: monkeyTest,
      ifTrue: monkeyTrue,
      ifFalse: monkeyFalse,
      inspections: 0,
    });
  }

  monkeys[0].operation = (num) => num * 2;
  monkeys[1].operation = (num) => num + 3;
  monkeys[2].operation = (num) => num + 6;
  monkeys[3].operation = (num) => num + 5;
  monkeys[4].operation = (num) => num + 8;
  monkeys[5].operation = (num) => num * 5;
  monkeys[6].operation = (num) => num * num;
  monkeys[7].operation = (num) => num + 4;

  let lcd = 1;
  for (let monkey of monkeys) {
    lcd *= monkey.test;
  }

  for (let i = 0; i < 10000; i++) {
    for (const monkey of monkeys) {
      for (let item of monkey.items) {
        let worry = monkey.operation(item);
        // worry = Math.floor(worry / 3);
        worry = worry % lcd;
        if (worry % monkey.test === 0) monkeys[monkey.ifTrue].items.push(worry);
        else monkeys[monkey.ifFalse].items.push(worry);
        monkey.inspections++;
      }
      monkey.items = [];
    }
  }

  console.log(monkeys);

  monkeys.sort((a, b) => b.inspections - a.inspections);

  return monkeys[0].inspections * monkeys[1].inspections;
};

// console.log(solve1(test));
console.log(solve1(input));

console.log(solve2(input));
