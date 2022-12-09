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
    // console.log(input[i]);
    for (let j = 0; j < distance; j++) {
      const otherColumn = affectedColumn ? 0 : 1;
      // move the head
      rope[0][affectedColumn] += direction;

      for (let j = 1; j < rope.length; j++) {
        const currentKnot = rope[j];
        const previousKnot = rope[j - 1];

        if (
          (Math.abs(previousKnot[0] - currentKnot[0]) > 1 &&
            previousKnot[1] !== currentKnot[1]) ||
          (Math.abs(previousKnot[1] - currentKnot[1]) > 1 &&
            previousKnot[0] !== currentKnot[0])
        ) {
          currentKnot[0] += Math.sign(previousKnot[0] - currentKnot[0]);
          currentKnot[1] += Math.sign(previousKnot[1] - currentKnot[1]);
        } else if (Math.abs(previousKnot[0] - currentKnot[0]) > 1) {
          currentKnot[0] += Math.sign(previousKnot[0] - currentKnot[0]);
        } else if (Math.abs(previousKnot[1] - currentKnot[1]) > 1) {
          currentKnot[1] += Math.sign(previousKnot[1] - currentKnot[1]);
        }
      }

      // console.log(rope);

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

  const visited = doTheRopeThing(input, 10);

  return visited.size;
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
  onlyTests: false,
});
