const fs = require('fs');
const data = fs.readFileSync('./2016/input/Day4.txt', { encoding: 'utf8' });

class Room {
  constructor(input) {
    const firstHalf = input.split('[')[0];
    const secondHalf = input.split('[')[1];
    const firstHalfArr = firstHalf.split('-');
    this.checkSum = secondHalf.slice(0, secondHalf.length - 2);
    this.sectorId = +firstHalfArr.pop();
    this.name = firstHalfArr.join('');
  }
  getSectorId() {
    return this.sectorId;
  }
  isValid() {
    const dict = {};
    const chars = [];

    for (const char of this.name)
      if (dict[char]) dict[char]++;
      else {
        dict[char] = 1;
        chars.push(char);
      }

    chars.sort((a, b) => {
      if (dict[a] === dict[b]) return a.charCodeAt(0) - b.charCodeAt(0);
      return dict[b] - dict[a];
    });

    return chars.join('').slice(0, 5) === this.checkSum;
  }

  decryptName() {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for(const char of this.name.split('')){
      const idx = alpha.indexOf(char);
      const newIdx = idx + this.getSectorId();
      result += alpha[newIdx % 26]
    }

    return result;    
  }
}

const solve1 = (input) => {
  let sum = 0;

  for (const line of input.split('\n')) {
    const room = new Room(line);
    if (room.isValid()) sum += room.getSectorId();
  }

  return sum;
};

const solve2 = input => {
  let location = 0;

  for(const line of input.split('\n')){
    const room = new Room(line);
    loc = room.decryptName();
    if(loc === 'northpoleobjectstorage') return room.getSectorId();
  }

  return -1;
}

console.log(solve1(data));
console.log(solve2(data))