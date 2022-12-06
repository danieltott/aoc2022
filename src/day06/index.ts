import run from "aocrunner";

/**
 * -----
 * Input parser - is used in parts 1 and 2
 * -----
 */

const parseInput = (rawInput: string) => rawInput.split("");

/**
 * -----
 * Part 1
 * -----
 */

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let i = 0;
  let found;
  while (!found) {
    if (new Set(input.slice(i, i + 4)).size === 4) {
      found = i;
    }
    i++;
  }

  return found + 4;
};

/**
 * -----
 * Part 2
 * -----
 */

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
