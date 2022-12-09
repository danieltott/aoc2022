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

function doTheRopeThing(
  input: ReturnType<typeof parseInput>,
  ropeLength: number,
) {
  const visited = new Set(["0-0"]);
  const rope = Array.from({ length: ropeLength }, () => [0, 0]);

  for (let i = 0; i < input.length; i++) {
    const [affectedColumn, direction, distance] = input[i];

    for (let j = 0; j < distance; j++) {
      const otherColumn = affectedColumn ? 0 : 1;
      // move the head
      rope[0][affectedColumn] += direction;

      for (let j = 1; j < rope.length; j++) {
        const currentKnot = rope[j];
        const previousKnot = rope[j - 1];

        // if that moved it too far that direction, move the tail in the same direction
        if (
          Math.abs(previousKnot[affectedColumn] - currentKnot[affectedColumn]) >
          1
        ) {
          currentKnot[affectedColumn] += Math.sign(
            previousKnot[affectedColumn] - currentKnot[affectedColumn],
          );

          // if the tail is now diagonal to the head, move the tail into the same column as the head
          if (
            previousKnot[0] !== currentKnot[0] &&
            previousKnot[1] !== currentKnot[1]
          ) {
            currentKnot[otherColumn] += Math.sign(
              previousKnot[otherColumn] - currentKnot[otherColumn],
            );
          }
        } else if (
          Math.abs(previousKnot[otherColumn] - currentKnot[otherColumn]) > 1
        ) {
          // if we had previously moved to far away the last time, move the tail that direction
          currentKnot[otherColumn] += Math.sign(
            previousKnot[otherColumn] - currentKnot[otherColumn],
          );
        }
      }

      visited.add(rope[rope.length - 1].join("-"));
    }
  }
  return visited;
}

/**
 * -----
 * Part 1
 * -----
 */

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const visited = doTheRopeThing(input, 2);

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
        expected: 1,
      },
      {
        input: `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
