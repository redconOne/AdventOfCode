const fs = require('fs');
const data = fs.readFileSync('./2015/input/Day14.txt', { encoding: 'utf8' });

class Reindeer {
  constructor(name, perSecond, seconds, rest) {
    this.name = name;
    this.perSecond = perSecond;
    this.seconds = seconds;
    this.rest = rest;
    this.distance = 0;
    this.resting = 0;
    this.running = seconds;
    this.score = 0;
  }
  move() {
    if (this.running) {
      this.running--;
      this.distance += this.perSecond;
      if (!this.running) this.resting = this.rest;
    } else {
      this.resting--;
      if (!this.resting) this.running = this.seconds;
    }
  }
  addPoint() {
    this.score++;
  }
}

const createReindeer = (input) => {
  const reindeer = [];
  const regex =
    /(?<name>\w+) can fly (?<perSecond>\d+) km\/s for (?<seconds>\d+) seconds, but then must rest for (?<rest>\d+) seconds./;

  for (const line of input.split('\n')) {
    const { name, perSecond, seconds, rest } = line.match(regex).groups;
    const deer = new Reindeer(name, +perSecond, +seconds, +rest);
    reindeer.push(deer);
  }

  return reindeer;
};

const solve1 = (input) => {
  const reindeer = createReindeer(input);

  for (let i = 0; i < 2503; i++) {
    for (const deer of reindeer) deer.move();
  }

  let maxDistance = 0;

  for (const deer of reindeer)
    maxDistance = Math.max(maxDistance, deer.distance);

  return maxDistance;
};

const solve2 = (input) => {
  const reindeer = createReindeer(input);

  for (let i = 0; i < 2503; i++) {
    let maxDistance = 0;

    for (const deer of reindeer) {
      deer.move();
      maxDistance = Math.max(maxDistance, deer.distance);
    }

    for (const deer of reindeer)
      if (deer.distance >= maxDistance) deer.addPoint();
  }

  let leadDeer = reindeer[0];

  for (const deer of reindeer) if (deer.score > leadDeer.score) leadDeer = deer;

  return leadDeer.score;
};

console.log(solve1(data));
console.log(solve2(data));
