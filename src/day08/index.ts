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
  let currentTallestInRow = 0;
  let currentTallestInColumn = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const treeHeight = input[i][j];
      if (
        i === 0 ||
        i === input.length - 1 ||
        j === 0 ||
        j === input[i].length - 1
      ) {
        // tree is on the edge
        console.log(i, j, treeHeight, true, "edge");
        visibleTrees++;
      } else {
        if (treeHeight > currentTallestInRow) {
          currentTallestInRow = treeHeight;
          console.log(i, j, treeHeight, true, "left");
          visibleTrees++;
        } else if (treeHeight > currentTallestInColumn) {
          currentTallestInColumn = treeHeight;
          console.log(i, j, treeHeight, true, "top");
          visibleTrees++;
        } else {
          // look to the right
          let visibleToTheRight = true;
          for (let k = j + 1; k < input[i].length; k++) {
            if (treeHeight <= input[i][k]) {
              visibleToTheRight = false;
              break;
            }
          }
          if (visibleToTheRight) {
            console.log(i, j, treeHeight, true, "right");
            visibleTrees++;
          } else {
            let visibleToTheBottom = true;
            // look down
            for (let k = i + 1; k < input.length; k++) {
              if (treeHeight <= input[k][j]) {
                visibleToTheBottom = false;
                break;
              }
            }
            if (visibleToTheBottom) {
              console.log(i, j, treeHeight, true, "bottom");
              visibleTrees++;
            } else {
              console.log(i, j, treeHeight, false);
            }
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
  onlyTests: true,
});
