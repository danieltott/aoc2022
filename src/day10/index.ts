import run from "aocrunner";

/**
 * -----
 * Input parser - is used in parts 1 and 2
 * -----
 */

const parseInput = (rawInput: string) => rawInput.split("\n");

/**
 * -----
 * Part 1
 * -----
 */

const isInteresting = (x: number) => {
  return (x - 20) % 40 === 0;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce(
    (acc, line) => {
      const updated = {
        ...acc,
        cycle: acc.cycle + 1,
      };

      if (line === "noop") {
        if (isInteresting(updated.cycle)) {
          updated.interestingSum += updated.cycle * updated.x;
        }
        return updated;
      }

      const value = parseInt(line.slice(4));

      if (isInteresting(updated.cycle)) {
        updated.interestingSum += updated.cycle * updated.x;
      }

      updated.cycle += 1;

      if (isInteresting(updated.cycle)) {
        updated.interestingSum += updated.cycle * updated.x;
      }

      updated.x += value;

      return updated;
    },
    {
      x: 1,
      cycle: 0,
      interestingSum: 0,
    },
  ).interestingSum;
};

/**
 * -----
 * Part 2
 * -----
 */

function getChar(position: number, x: number) {
  let char;
  if (position >= x && position <= x + 2) {
    char = "#";
  } else {
    char = ".";
  }

  if (position === 40) {
    return char + "\n";
  }
  return char;
}

function getPosition(cycle: number) {
  const position = cycle % 40;
  if (position === 0) {
    return 40;
  }
  return position;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const result = input.reduce(
    (acc, line) => {
      const updated = {
        ...acc,
        cycle: acc.cycle + 1,
      };
      console.log("cycle", updated.cycle);

      let position = getPosition(updated.cycle);

      updated.message += getChar(position, updated.x);

      if (line === "noop") {
        return updated;
      }

      const value = parseInt(line.slice(4));

      updated.cycle += 1;
      console.log("cycle", updated.cycle);

      position = getPosition(updated.cycle);

      updated.message += getChar(position, updated.x);

      updated.x += value;

      return updated;
    },
    {
      x: 1,
      cycle: 0,
      message: "",
    },
  );

  console.log(result.message);

  return result.message;

  // RZHFGJCB
};

/**
 * -----
 * Runner
 * -----
 */

run({
  part1: {
    tests: [
      {
        input: `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`,
        expected: `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....
`,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
