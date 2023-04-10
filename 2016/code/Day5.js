const fs = require('fs');
const crypto = require('crypto');
const data = fs.readFileSync('./2016/input/Day5.txt', { encoding: 'utf-8' });

class Password {
  constructor(prefix, suffix) {
    this.prefix = prefix;
    this.suffix = suffix;
    this.special = '.';
    this.char = '.';
  }
  isValid(num) {
    const hash = crypto.Hash('md5');
    hash.update(this.prefix + this.suffix);
    const currentHash = hash.digest('hex');
    if (currentHash.startsWith('0'.repeat(num))) {
      this.special = currentHash[5];
      this.char = currentHash[6];
      return true;
    }

    return false;
  }
  increase() {
    this.suffix++;
  }
  getChar() {
    return this.char;
  }
  getSpecial() {
    return this.special;
  }
}

const solve1 = (input) => {
  const code = [];
  const pwd = new Password(input, 0);
  while (code.length < 8) {
    pwd.increase();
    if (pwd.isValid(5)) {
      code.push(pwd.getSpecial());
    }
  }
  return code.join('');
};

const solve2 = (input) => {
  const code = new Array(8);
  code.fill(' ');
  const pwd = new Password(input, 0);
  while (code.includes(' ')) {
    pwd.increase();
    if (pwd.isValid(5)) {
      const loc = +pwd.getSpecial();
      if (code[loc] && code[loc] === ' ') code[loc] = pwd.getChar();
    }
  }

  return code.join('');
};

console.log(solve1(data));
console.log(solve2(data));
