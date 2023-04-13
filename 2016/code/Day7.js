const fs = require('fs');
const data = fs.readFileSync('./2016/input/Day7.txt', { encoding: 'utf-8' });

class IPAddress {
  constructor(address) {
    this.address = address;
    const first = address.match(/^[^\[]+/)[0];
    this.insideBrackets = address.match(/\[(.*?)\]/g) || [];
    this.outsideBrackets = address.match(/(?<=\])[^\[]+(?=\[)/g) || [];
    const temp = address.match(/(?<=\])[^\]]+/g);
    const last = temp[temp.length - 1];
    this.outsideBrackets.push(first);
    this.outsideBrackets.push(last);
  }
  supportsTLS() {
    return (
      this.isABBA(this.outsideBrackets) && !this.isABBA(this.insideBrackets)
    );
  }
  isABBA(arr) {
    for (const item of arr) {
      for (let i = 0; i < item.length - 3; i++) {
        const char1 = item[i];
        const char2 = item[i + 1];
        const char3 = item[i + 2];
        const char4 = item[i + 3];
        if (char1 === char4 && char2 === char3 && char1 !== char2) return true;
      }
    }
    return false;
  }
  supportsSSL() {
    const abaArr = this.getABA(this.outsideBrackets);
    return this.hasBAB(this.insideBrackets, abaArr);
  }
  getABA(arr) {
    const results = [];
    for (const item of arr) {
      for (let i = 0; i < item.length - 2; i++) {
        const char1 = item[i];
        const char2 = item[i + 1];
        const char3 = item[i + 2];
        const current = char1 + char2 + char3;
        if (char1 === char3 && char1 !== char2) results.push(current);
      }
    }
    return results;
  }

  hasBAB(possibles, abaArr) {
    for (const item of possibles) {
      for (let i = 0; i < item.length - 2; i++) {
        const char1 = item[i];
        const char2 = item[i + 1];
        const char3 = item[i + 2];
        const current = char2 + char1 + char2;
        if (char1 === char3 && char1 !== char2 && abaArr.includes(current))
          return true;
      }
    }
    return false;
  }
}

const solve1 = (input) => {
  let total = 0;

  for (const IP of input.split('\n')) {
    const addr = new IPAddress(IP);
    if (addr.supportsTLS()) total++;
  }

  return total;
};

const solve2 = (input) => {
  let total = 0;

  for (const IP of input.split('\n')) {
    const addr = new IPAddress(IP);
    if (addr.supportsSSL()) total++;
  }

  return total;
};

console.log(solve1(data));
console.log(solve2(data));
