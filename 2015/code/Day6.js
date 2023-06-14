import { readFileSync } from "fs";
const data = readFileSync("./2015/input/Day6.txt", { encoding: "utf8" })
  .replace(/\r/g, "")
  .trim();

const toggle = (input, grid, modifier) => {
  const startX = input[0];
  const startY = input[1];
  const endX = input[2];
  const endY = input[3];

  for (let y = startY; y <= endY; y++) {
    for (let x = startX; x <= endX; x++) {
      switch (modifier) {
        case "on":
          grid[y][x] = 1;
          break;
        case "off":
          grid[y][x] = 0;
          break;
        case "toggle":
          grid[y][x] = grid[y][x] ? 0 : 1;
          break;
        case "add1":
          grid[y][x]++;
          break;
        case "sub1":
          grid[y][x] -= grid[y][x] ? 1 : 0;
          break;
        default:
          console.log("Check toggle switch");
          break;
      }
    }
  }
};

const createLights = () => {
  const arr = [];
  for (let i = 0; i < 1000; i++) {
    const row = [];
    for (let j = 0; j < 1000; j++) row.push(0);
    arr.push(row);
  }
  return arr;
};

const solve1 = (input) => {
  const lights = createLights();

  for (const line of input.split("\n")) {
    const turnRegex =
      /turn (?<modifier>\w+) (?<startX>\d+),(?<startY>\d+) through (?<endX>\d+),(?<endY>\d+)/;
    const toggleRegex =
      /(?<modifier>\w+) (?<startX>\d+),(?<startY>\d+) through (?<endX>\d+),(?<endY>\d+)/;

    if (line.includes("turn")) {
      const { modifier, startX, startY, endX, endY } =
        line.match(turnRegex).groups;
      toggle([+startX, +startY, +endX, +endY], lights, modifier);
    } else {
      const { modifier, startX, startY, endX, endY } =
        line.match(toggleRegex).groups;
      toggle([+startX, +startY, +endX, +endY], lights, modifier);
    }
  }

  let total = 0;
  for (const row of lights) for (const light of row) if (light) total++;

  return total;
};

const solve2 = (input) => {
  const lights = createLights();

  for (const line of input.split("\n")) {
    let regex =
      /turn (?<modifier>\w+) (?<startX>\d+),(?<startY>\d+) through (?<endX>\d+),(?<endY>\d+)/;

    if (line.includes("toggle")) {
      regex =
        /(?<modifier>\w+) (?<startX>\d+),(?<startY>\d+) through (?<endX>\d+),(?<endY>\d+)/;
    }

    const { modifier, startX, startY, endX, endY } = line.match(regex).groups;

    toggle(
      [+startX, +startY, +endX, +endY],
      lights,
      modifier === "off" ? "sub1" : "add1",
    );
    if (line.includes("toggle")) {
      toggle(
        [+startX, +startY, +endX, +endY],
        lights,
        modifier === "off" ? "sub1" : "add1",
      );
    }
  }

  let total = 0;

  for (const row of lights) for (const light of row) total += light;

  return total;
};

console.log(solve1(data));
console.log(solve2(data));
