import run from "aocrunner";

/**
 * -----
 * Input parser - is used in parts 1 and 2
 * -----
 */

type Stacks = Record<string, string[]>;

const parseInput = (rawInput: string) => {
  const [stacksRows, steps] = rawInput
    .split("\n\n")
    .map((group) => group.split("\n")) as [string[], string[]];

  // labels is the last row of the stacksRows
  const labels = stacksRows[stacksRows.length - 1]
    .split(/ (\d) /)
    .filter((a) => !!a.trim());

  /**
   * For each label,build up an array of the stacks
   */
  const initialStacks = labels.reduce((stacksObj, label, index) => {
    return {
      ...stacksObj,
      [label]: stacksRows
        .slice(0, stacksRows.length - 1)
        .map((row) => {
          return row[index * 4 + 1].trim();
        })
        .filter(Boolean),
    };
  }, {} as Stacks);

  return [labels, initialStacks, steps] as [string[], Stacks, string[]];
};

/**
 * -----
 * Part 2
 * -----
 */

const part1 = (rawInput: string) => {
  const [labels, initialStacks, steps] = parseInput(rawInput);

  const movedStacks = steps.reduce(
    (stacks, step) => {
      const [countStr, from, to] = step.substring(5).split(/ from | to /);
      const count = parseInt(countStr, 10);
      const x = {
        ...stacks,
        [from]: stacks[from].slice(count),
        [to]: [...stacks[from].slice(0, count).reverse(), ...stacks[to]],
      };

      return x;
    },
    { ...initialStacks } as Stacks,
  );

  return labels.map((label) => movedStacks[label][0]).join("");
};

/**
 * -----
 * Part 2
 * -----
 */

const part2 = (rawInput: string) => {
  const [labels, initialStacks, steps] = parseInput(rawInput);

  // literally exactly the same as above except without the `reverse()`
  const movedStacks = steps.reduce(
    (stacks, step) => {
      const [countStr, from, to] = step.substring(5).split(/ from | to /);
      const count = parseInt(countStr, 10);
      const x = {
        ...stacks,
        [from]: stacks[from].slice(count),
        [to]: [...stacks[from].slice(0, count), ...stacks[to]],
      };

      return x;
    },
    { ...initialStacks } as Stacks,
  );

  return labels.map((label) => movedStacks[label][0]).join("");
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
        /**
 * VScode is really messing up this input with its auto formatting. Here's the actual input:
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
 */
        input:
          ["    [D]    ", "[N] [C]    ", "[Z] [M] [P]", " 1   2   3 "].join(
            "\n",
          ) +
          `

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        /**
 * VScode is really messing up this input with its auto formatting. Here's the actual input:
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
 */
        input:
          ["    [D]    ", "[N] [C]    ", "[Z] [M] [P]", " 1   2   3 "].join(
            "\n",
          ) +
          `

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: true,
});
