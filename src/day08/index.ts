import run from "aocrunner";

/**
 * -----
 * Input parser - is used in parts 1 and 2
 * -----
 */

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split("").map(Number));

/**
 * -----
 * Part 1
 * -----
 */

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let visibleTrees = 0;

  for (let row = 0; row < input.length; row++) {
    let currentTallestInRow = input[row][0];

    for (let column = 0; column < input[row].length; column++) {
      const treeHeight = input[row][column];
      if (
        row === 0 ||
        row === input.length - 1 ||
        column === 0 ||
        column === input[row].length - 1
      ) {
        // tree is on the edge
        visibleTrees++;
      } else {
        if (treeHeight > currentTallestInRow) {
          currentTallestInRow = treeHeight;
          visibleTrees++;
        } else {
          // loop up
          let visibleToTheTop = true;
          for (let k = row - 1; k >= 0; k--) {
            if (treeHeight <= input[k][column]) {
              visibleToTheTop = false;
              break;
            }
          }
          if (visibleToTheTop) {
            visibleTrees++;
            continue;
          }
          // look to the right
          let visibleToTheRight = true;
          for (let k = column + 1; k < input[row].length; k++) {
            if (treeHeight <= input[row][k]) {
              visibleToTheRight = false;
              break;
            }
          }
          if (visibleToTheRight) {
            visibleTrees++;
            continue;
          }

          // look down
          let visibleToTheBottom = true;
          for (let k = row + 1; k < input.length; k++) {
            if (treeHeight <= input[k][column]) {
              visibleToTheBottom = false;
              break;
            }
          }
          if (visibleToTheBottom) {
            visibleTrees++;
            continue;
          }
        }
      }
    }
  }

  return visibleTrees;
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
        input: `
30373
25512
65332
33549
35390
        `,
        expected: 21,
      },
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
