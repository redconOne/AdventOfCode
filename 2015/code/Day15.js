import { readFileSync } from 'fs';

const data = readFileSync('./2015/input/Day15.txt', { encoding: 'utf-8' });

class Ingredient {
  constructor(name, capacity, durability, flavor, texture, calories) {
    this.name = name;
    this.capacity = capacity;
    this.durability = durability;
    this.flavor = flavor;
    this.texture = texture;
    this.calories = calories;
    this.amount = 0;
  }
  setAmount(amount) {
    this.amount = amount;
  }
  getCapacity() {
    return this.amount * this.capacity;
  }
  getDurability() {
    return this.amount * this.durability;
  }
  getFlavor() {
    return this.amount * this.flavor;
  }
  getTexture() {
    return this.amount * this.texture;
  }
  getCalories() {
    return this.amount * this.calories;
  }
}

const solve1 = (input) => {
  const ingredients = [];
  const regex =
    /(?<ingredient>\w+): capacity (?<capacity>-?\d+), durability (?<durability>-?\d+), flavor (?<flavor>-?\d+), texture (?<texture>\d+), calories (?<calories>\d+)/;
  for (const line of input.split('\n')) {
    const { ingredient, capacity, durability, flavor, texture, calories } =
      line.match(regex).groups;
    const current = new Ingredient(
      ingredient,
      +capacity,
      +durability,
      +flavor,
      +texture,
      +calories
    );
    ingredients.push(current);
  }

  const totalIngredients = 100;
  let possibilities = [];

  for (let q = 0; q <= totalIngredients; q++)
    for (let w = 0; w <= totalIngredients - q; w++)
      for (let e = 0; e <= totalIngredients - q - w; e++)
        for (let r = 0; r <= totalIngredients - q - w - e; r++)
          if (q + w + e + r === totalIngredients)
            possibilities.push([q, w, e, r]);

  const cookies = possibilities.map((cookie) => {
    let capacity = 0;
    let durability = 0;
    let flavor = 0;
    let texture = 0;

    ingredients.map((ingredient, idx) => {
      ingredient.setAmount(cookie[idx]);
      capacity += ingredient.getCapacity();
      durability += ingredient.getDurability();
      flavor += ingredient.getFlavor();
      texture += ingredient.getTexture();
    });

    if (capacity <= 1 || durability <= 1 || flavor <= 1 || texture <= 1)
      return 0;
    return capacity * durability * flavor * texture;
  });

  cookies.sort((a, b) => b - a);
  return cookies[0];
};

const solve2 = (input) => {
  const ingredients = [];
  const regex =
    /(?<ingredient>\w+): capacity (?<capacity>-?\d+), durability (?<durability>-?\d+), flavor (?<flavor>-?\d+), texture (?<texture>\d+), calories (?<calories>\d+)/;
  for (const line of input.split('\n')) {
    const { ingredient, capacity, durability, flavor, texture, calories } =
      line.match(regex).groups;
    const current = new Ingredient(
      ingredient,
      +capacity,
      +durability,
      +flavor,
      +texture,
      +calories
    );
    ingredients.push(current);
  }

  const totalIngredients = 100;
  let possibilities = [];

  for (let q = 0; q <= totalIngredients; q++)
    for (let w = 0; w <= totalIngredients - q; w++)
      for (let e = 0; e <= totalIngredients - q - w; e++)
        for (let r = 0; r <= totalIngredients - q - w - e; r++)
          if (q + w + e + r === totalIngredients)
            possibilities.push([q, w, e, r]);

  const cookies = possibilities.map((cookie) => {
    let capacity = 0;
    let durability = 0;
    let flavor = 0;
    let texture = 0;
    let calories = 0;

    ingredients.map((ingredient, idx) => {
      ingredient.setAmount(cookie[idx]);
      capacity += ingredient.getCapacity();
      durability += ingredient.getDurability();
      flavor += ingredient.getFlavor();
      texture += ingredient.getTexture();
      calories += ingredient.getCalories();
    });

    if (capacity <= 1 || durability <= 1 || flavor <= 1 || texture <= 1)
      return 0;
    if (calories !== 500) return 0;
    return capacity * durability * flavor * texture;
  });

  cookies.sort((a, b) => b - a);

  return cookies[0];
};

console.log(solve1(data));
console.log(solve2(data));
