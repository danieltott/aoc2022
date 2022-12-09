import run from "aocrunner";

/**
 * -----
 * Input parser - is used in parts 1 and 2
 * -----
 */

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line) => {
    const [direction, distance] = line.split(" ");

    const affectedColumn = direction === "U" || direction === "D" ? 1 : 0;
    const move = direction === "U" || direction === "R" ? 1 : -1;
    return [affectedColumn, move, parseInt(distance)];
  });

/**
 * -----
 * Part 1
 * -----
 */

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);
  const headPosition = [0, 0];
  const tailPosition = [0, 0];
  const visited = new Set([tailPosition.join("-")]);

  for (let i = 0; i < input.length; i++) {
    const [affectedColumn, direction, distance] = input[i];
    console.log(input[i]);

    for (let j = 0; j < distance; j++) {
      const otherColumn = affectedColumn ? 0 : 1;
      // move the head
      headPosition[affectedColumn] += direction;

      // if that moved it too far that direction, move the tail in the same direction
      if (
        Math.abs(headPosition[affectedColumn] - tailPosition[affectedColumn]) >
        1
      ) {
        tailPosition[affectedColumn] += Math.sign(
          headPosition[affectedColumn] - tailPosition[affectedColumn],
        );

        // if the tail is now diagonal to the head, move the tail into the same column as the head
        if (
          headPosition[0] !== tailPosition[0] &&
          headPosition[1] !== tailPosition[1]
        ) {
          tailPosition[otherColumn] += Math.sign(
            headPosition[otherColumn] - tailPosition[otherColumn],
          );
        }
      } else if (
        Math.abs(headPosition[otherColumn] - tailPosition[otherColumn]) > 1
      ) {
        // if we had previously moved to far away the last time, move the tail that direction
        tailPosition[otherColumn] += Math.sign(
          headPosition[otherColumn] - tailPosition[otherColumn],
        );
      }

      visited.add(tailPosition.join("-"));

      console.log({
        headPosition,
        tailPosition,
      });
    }
  }

  console.log([...visited].sort());
  /*
..##..
...##.
.####.
....#.
s###..
*/
  return visited.size;
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
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`,
        expected: 13,
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
