import { readFileSync } from 'fs';
const data = readFileSync('./2018/input/Day4.txt', {
  encoding: 'utf8',
}).replaceAll('\r\n', '\n');

class Shift {
  constructor(year, month, day, hour, guard) {
    this.guard = guard;
    this.year = year;
    this.month = month;
    this.day = day;
    if (hour === 23) this.day++;
    if (this.day === 29 && this.month === 2) {
      this.month++;
      this.day = 1;
    }
    if (this.day === 31 && [4, 6, 9, 11].includes(this.month)) {
      this.month++;
      this.day = 1;
    }
    if (this.day === 32) {
      this.month++;
      this.day = 1;
    }

    this.minutes = new Array(60).fill(false);
    this.asleep = [];
    this.awake = [];
  }
  addAsleep(input) {
    this.asleep.push(input);
  }
  addAwake(input) {
    this.awake.push(input);
  }
  showShift() {
    return `${this.month}-${this.day.toString().padStart(2, '0')} #${this.guard
      .toString()
      .padStart(4, '0')} ${this.minutes.map((x) => (x ? '.' : '#')).join('')}`;
  }
  calc() {
    let awake = true;
    let nextAsleep = this.asleep.shift() || 60;
    let nextAwake = 0;

    for (let i = 0; i < this.minutes.length; i++) {
      if (awake) {
        if (i === nextAsleep) {
          awake = false;
          nextAwake = this.awake.shift() || 60;
        }
      } else {
        if (i === nextAwake) {
          awake = true;
          nextAsleep = this.asleep.shift() || 60;
        }
      }
      this.minutes[i] = awake;
    }
  }
}

const solve1 = (input) => {
  let instructions = input.split('\n');
  const shifts = [];

  const parseYear = (input) => {
    return +input.split(' ')[0].split('-')[0].slice(1);
  };
  const parseMonth = (input) => {
    return +input.split(' ')[0].split('-')[1];
  };
  const parseDay = (input) => {
    return +input.split(' ')[0].split('-')[2];
  };
  const parseHour = (input) => {
    return +input.split(' ')[1].split(':')[0];
  };
  const parseMinute = (input) => {
    return +input.split(' ')[1].split(':')[1].slice(0, 2);
  };
  const parseGuard = (input) => {
    return +input.split(' ')[3].slice(1);
  };
  const compare = (input1, input2, fun) => {
    const val1 = fun(input1);
    const val2 = fun(input2);
    return val1 - val2;
  };

  instructions.sort((a, b) => {
    const year = compare(a, b, parseYear);
    if (year) return year;
    const month = compare(a, b, parseMonth);
    if (month) return month;
    const day = compare(a, b, parseDay);
    if (day) return day;

    const hour = compare(a, b, parseHour);
    if (hour) return hour;
    const minute = compare(a, b, parseMinute);
    return minute;
  });

  for (const line of instructions) {
    const year = parseYear(line);
    const month = parseMonth(line);
    const day = parseDay(line);
    const hour = parseHour(line);
    if (line.includes('#')) {
      const guard = parseGuard(line);
      const shift = new Shift(year, month, day, hour, guard);
      shifts.push(shift);
    }
    if (line.includes('falls')) {
      const shift = shifts.filter(
        (x) => x.year === year && x.month === month && x.day === day
      )[0];
      const minute = parseMinute(line);
      shift.addAsleep(minute);
    }
    if (line.includes('wakes')) {
      const shift = shifts.filter(
        (x) => x.year === year && x.month === month && x.day === day
      )[0];
      const minute = parseMinute(line);
      shift.addAwake(minute);
    }
  }

  const guards = new Map();
  const guardSleeps = new Map();

  for (const shift of shifts) {
    shift.calc();
    const minutesAsleep = shift.minutes.filter((x) => !x).length;
    guards.set(shift.guard, (guards.get(shift.guard) || 0) + minutesAsleep);

    const asleepAt = shift.minutes
      .map((min, idx) => (!min ? idx : -1))
      .filter((x) => x !== -1);
    const current = guardSleeps.get(shift.guard) || [];
    guardSleeps.set(shift.guard, current.concat(asleepAt));
  }

  let mostAsleepGuard = 0;
  let timeAsleep = 0;

  for (const guard of guards) {
    if (guard[1] > timeAsleep) {
      timeAsleep = guard[1];
      mostAsleepGuard = guard[0];
    }
  }

  const allTimesAsleep = guardSleeps.get(mostAsleepGuard);
  const dict = {};
  for (const num of allTimesAsleep) dict[num] = (dict[num] || 0) + 1;
  let max = 0;

  for (const key in dict) max = Math.max(max, dict[key]);

  for (let i = 0; i < 60; i++) {
    if (max === dict[i]) return mostAsleepGuard * i;
  }

  return mostAsleepGuard;
};

const solve2 = (input) => {
  let instructions = input.split('\n');
  const shifts = [];

  const parseYear = (input) => {
    return +input.split(' ')[0].split('-')[0].slice(1);
  };
  const parseMonth = (input) => {
    return +input.split(' ')[0].split('-')[1];
  };
  const parseDay = (input) => {
    return +input.split(' ')[0].split('-')[2];
  };
  const parseHour = (input) => {
    return +input.split(' ')[1].split(':')[0];
  };
  const parseMinute = (input) => {
    return +input.split(' ')[1].split(':')[1].slice(0, 2);
  };
  const parseGuard = (input) => {
    return +input.split(' ')[3].slice(1);
  };
  const compare = (input1, input2, fun) => {
    const val1 = fun(input1);
    const val2 = fun(input2);
    return val1 - val2;
  };

  instructions.sort((a, b) => {
    const year = compare(a, b, parseYear);
    if (year) return year;
    const month = compare(a, b, parseMonth);
    if (month) return month;
    const day = compare(a, b, parseDay);
    if (day) return day;

    const hour = compare(a, b, parseHour);
    if (hour) return hour;
    const minute = compare(a, b, parseMinute);
    return minute;
  });

  for (const line of instructions) {
    const year = parseYear(line);
    const month = parseMonth(line);
    const day = parseDay(line);
    const hour = parseHour(line);
    if (line.includes('#')) {
      const guard = parseGuard(line);
      const shift = new Shift(year, month, day, hour, guard);
      shifts.push(shift);
    }
    if (line.includes('falls')) {
      const shift = shifts.filter(
        (x) => x.year === year && x.month === month && x.day === day
      )[0];
      const minute = parseMinute(line);
      shift.addAsleep(minute);
    }
    if (line.includes('wakes')) {
      const shift = shifts.filter(
        (x) => x.year === year && x.month === month && x.day === day
      )[0];
      const minute = parseMinute(line);
      shift.addAwake(minute);
    }
  }

  let targetGuard = 0;
  let targetMinute = 0;
  let frequency = 0;
  const guards = new Map();

  for (const shift of shifts) {
    shift.calc();
    const guard = guards.get(shift.guard) || new Array(60).fill(0);

    for (let i = 0; i < 60; i++) {
      if (!shift.minutes[i]) guard[i]++;
    }
    guards.set(shift.guard, guard);
  }

  for (const guard of guards) {
    const arr = guard[1].map((min, idx) => [idx, min]);
    for (const time of arr) {
      if (time[1] > frequency) {
        frequency = time[1];
        targetMinute = time[0];
        targetGuard = guard[0];
      }
    }
  }

  return targetGuard * targetMinute;
};

console.log(solve1(data));
console.log(solve2(data));
