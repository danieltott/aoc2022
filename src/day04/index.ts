import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((total, row) => {
    const [aStart, aStop, bStart, bStop] = row.split(/[,-]/).map(Number);
    if (aStart <= bStart && aStop >= bStop) {
      return total + 1;
    }
    if (bStart <= aStart && bStop >= aStop) {
      return total + 1;
    }
    return total;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((total, row) => {
    const [aStart, aStop, bStart, bStop] = row.split(/[,-]/).map(Number);

    if (aStop >= bStart && aStop <= bStop) {
      return total + 1;
    }
    if (bStop >= aStart && bStop <= aStop) {
      return total + 1;
    }

    return total;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `17-92,7-17
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`,
        expected: 5,
      },
      {
        input: `3-99,2-98
23-92,23-24
92-92,19-93
3-94,3-96`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
