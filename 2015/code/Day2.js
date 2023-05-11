import { readFileSync } from 'fs';
const data = readFileSync('./2015/input/Day2.txt', { encoding: 'utf8' })
  .replace(/\r/g, '')
  .trim();

const calcPaper = (input) => {
  const regex = /(?<l>\d+)x(?<w>\d+)x(?<h>\d+)/;
  const { l, w, h } = input.match(regex).groups;
  const side1 = +l * +w;
  const side2 = +l * +h;
  const side3 = +h * +w;
  const min = Math.min(side1, side2, side3);

  return 2 * (side1 + side2 + side3) + min;
};

const solve1 = (input) => {
  let requiredPaper = 0;

  for (const gift of input.split('\n')) requiredPaper += calcPaper(gift);

  return requiredPaper;
};

const calcPaperV2 = (input) => {
  const regex = /(?<l>\d+)x(?<w>\d+)x(?<h>\d+)/;
  const { l, w, h } = input.match(regex).groups;
  const max = Math.max(+l, +w, +h);
  const ribbon = (+l + +w + +h - max) * 2;
  const bow = +l * +w * +h;

  return ribbon + bow;
};

const solve2 = (input) => {
  let requiredPaper = 0;

  for (const gift of input.split('\n')) requiredPaper += calcPaperV2(gift);

  return requiredPaper;
};

console.log(solve1(data));
console.log(solve2(data));
