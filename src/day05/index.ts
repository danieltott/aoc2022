import run from "aocrunner";

type Stacks = Record<string, string[]>;

const parseInput = (rawInput: string) => {
  if (rawInput.indexOf("\n\n") === -1 || rawInput.indexOf("\n\n") === 0) {
    throw new Error("invalid input");
  }
  const [stacksRows, steps] = rawInput
    .split("\n\n")
    .map((group) => group.split("\n")) as [string[], string[]];

  const labels = stacksRows[stacksRows.length - 1]
    .split(/ (\d) /)
    .filter((a) => !!a.trim());

  const initialStacks = labels.reduce((stacksObj, label, index) => {
    return {
      ...stacksObj,
      [label]: stacksRows
        .map((row) => {
          return row[index * 4 + 1].trim();
        })
        .filter(Boolean),
    };
  }, {} as Stacks);

  return [labels, initialStacks, steps] as [string[], Stacks, string[]];
};

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

const part2 = (rawInput: string) => {
  const [labels, initialStacks, steps] = parseInput(rawInput);

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
  onlyTests: false,
});
