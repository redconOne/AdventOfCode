const fs = require('fs');
const data = fs.readFileSync('./2015/input/Day9.txt', { encoding: 'utf8' });

const createMap = (input) => {
  const map = new Map();
  const regex = /(?<city1>\w+) to (?<city2>\w+) = (?<distance>\d+)/;

  for (const line of input.split('\n')) {
    const { city1, city2, distance } = line.match(regex).groups;
    const way1 = `${city1}->${city2}`;
    const way2 = `${city2}->${city1}`;
    map.set(way1, +distance);
    map.set(way2, +distance);
  }

  return map;
};

const createCities = (input) => {
  const set = new Set();
  const regex = /(?<city1>\w+) to (?<city2>\w+) = (?<distance>\d+)/;
  for (const line of input.split('\n')) {
    const { city1, city2 } = line.match(regex).groups;
    set.add(city1);
    set.add(city2);
  }

  return Array.from(set);
};

const permute = (cities) => {
  if (!cities.length) return [[]];
  const permutations = [];

  for (let i = 0; i < cities.length; i++) {
    const current = cities[i];
    const others = cities.slice(0, i).concat(cities.slice(i + 1));
    const otherRoutes = permute(others);

    for (let j = 0; j < otherRoutes.length; j++) {
      const permutation = [current].concat(otherRoutes[j]);
      permutations.push(permutation);
    }
  }

  return permutations;
};

const solve1 = (input) => {
  const distances = createMap(input);
  const cities = createCities(input);
  const permutations = permute(cities);
  let minDistance = Infinity;

  for (const route of permutations) {
    let current = 0;
    for (let i = 0; i < route.length - 1; i++)
      current += distances.get(`${route[i]}->${route[i + 1]}`);

    minDistance = Math.min(minDistance, current);
  }

  return minDistance;
};

const solve2 = (input) => {
  const distances = createMap(input);
  const cities = createCities(input);
  const permutations = permute(cities);
  let maxDistance = 0;

  for (const route of permutations) {
    let current = 0;

    for (let i = 0; i < route.length - 1; i++)
      current += distances.get(`${route[i]}->${route[i + 1]}`);

    maxDistance = Math.max(maxDistance, current);
  }

  return maxDistance;
};
console.log(solve1(data));
console.log(solve2(data));
