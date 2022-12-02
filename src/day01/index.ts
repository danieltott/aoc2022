import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return (rawInput + "\n\n").split("\n").reduce(
    // reducer keeps a list of the top three totals
    ([maxes, curTotal], cur): [number[], number] => {
      const val = parseInt(cur);
      if (isNaN(val)) {
        // if isNaN that means we've hit a break and can do some sorting
        return [
          [...maxes, curTotal]
            .sort((a, b) => {
              return b - a;
            })
            .slice(0, 3),
          0,
        ];
      } else {
        // otherwise just keep adding to curTotal
        return [maxes, curTotal + val];
      }
    },
    [[0, 0, 0], 0] as [number[], number],
  )[0];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input[0];
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((a, b) => a + b, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
