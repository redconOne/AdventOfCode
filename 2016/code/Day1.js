const fs = require('fs');
const data = fs.readFileSync('./2016/input/Day1.txt', { encoding: 'utf8' });

class Santa {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.facing = 'N';
    this.visited = ['0,0'];
    this.targetLocation = [];
  }
  changeDirection(direction) {
    if (direction === 'L')
      switch (this.facing) {
        case 'N':
          this.facing = 'W';
          break;
        case 'W':
          this.facing = 'S';
          break;
        case 'S':
          this.facing = 'E';
          break;
        case 'E':
          this.facing = 'N';
          break;
        default:
          console.log('Check direction');
      }
    else
      switch (this.facing) {
        case 'N':
          this.facing = 'E';
          break;
        case 'E':
          this.facing = 'S';
          break;
        case 'S':
          this.facing = 'W';
          break;
        case 'W':
          this.facing = 'N';
          break;
        default:
          console.log('Check direction');
      }

    return this.facing;
  }
  moveUp(distance) {
    while (distance) {
      distance--;
      this.y--;
      const currentLoc = `${this.x},${this.y}`;
      if (this.visited.includes(currentLoc))
        this.targetLocation = [this.x, this.y];
      this.visited.push(currentLoc);
    }
  }
  moveDown(distance) {
    while (distance) {
      distance--;
      this.y++;
      const currentLoc = `${this.x},${this.y}`;
      if (this.visited.includes(currentLoc))
        this.targetLocation = [this.x, this.y];
      this.visited.push(currentLoc);
    }
  }
  moveLeft(distance) {
    while (distance) {
      distance--;
      this.x--;
      const currentLoc = `${this.x},${this.y}`;
      if (this.visited.includes(currentLoc))
        this.targetLocation = [this.x, this.y];
      this.visited.push(currentLoc);
    }
  }
  moveRight(distance) {
    while (distance) {
      distance--;
      this.x++;
      const currentLoc = `${this.x},${this.y}`;
      if (this.visited.includes(currentLoc))
        this.targetLocation = [this.x, this.y];
      this.visited.push(currentLoc);
    }
  }
  move(direction, distance) {
    const newDirection = this.changeDirection(direction);
    switch (newDirection) {
      case 'N':
        this.moveUp(distance);
        break;
      case 'E':
        this.moveRight(distance);
        break;
      case 'S':
        this.moveDown(distance);
        break;
      case 'W':
        this.moveLeft(distance);
        break;
      default:
        console.log('Check direction');
    }
  }
  getLocation() {
    return `${this.x},${this.y}`;
  }
}

const solve1 = (input) => {
  const santa = new Santa();
  const regex = /(?<direction>\w)(?<distance>\d+)/;

  for (const move of input.split(', ')) {
    const { direction, distance } = move.match(regex).groups;
    santa.move(direction, +distance);
  }

  return Math.abs(santa.x) + Math.abs(santa.y);
};

const solve2 = (input) => {
  const santa = new Santa();
  const regex = /(?<direction>\w)(?<distance>\d+)/;
  let location;

  for (const move of input.split(', ')) {
    const { direction, distance } = move.match(regex).groups;
    santa.move(direction, +distance);
    if (santa.targetLocation.length) break;
  }

  const targetX = Math.abs(santa.targetLocation[0]);
  const targetY = Math.abs(santa.targetLocation[1]);

  return targetX + targetY;
};

console.log(solve1(data));
console.log(solve2(data));
