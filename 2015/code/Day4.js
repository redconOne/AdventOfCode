import { readFileSync } from "fs";
const data = readFileSync("./2015/input/Day4.txt", { encoding: "utf8" });
const crypto = require("crypto");

const isValid = (key, num) => {
  const hash = crypto.Hash("md5");
  hash.update(key);
  return hash.digest("hex").startsWith("0".repeat(num));
};

const solve1 = (input) => {
  let suffix = 0;

  while (!isValid(input + suffix, 5)) suffix++;

  return suffix;
};

const solve2 = (input) => {
  let suffix = 0;

  while (!isValid(input + suffix, 6)) suffix++;

  return suffix;
};

console.log(solve1(data));
console.log(solve2(data));
