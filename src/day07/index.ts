import run from "aocrunner";

/**
 * -----
 * Input parser - is used in parts 1 and 2
 * -----
 */

const parseInput = (rawInput: string) => rawInput;

/**
 * -----
 * Part 1
 * -----
 */

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const directories: string[] = [];
  const counts: Record<string, number> = {};

  input
    .split(/\$ cd (.*)\n|\$ ls\n/)
    .filter(Boolean)
    .forEach((line) => {
      if (line.match(/^dir .*|^[0-9]+ /)) {
        const count = line
          .trim()
          .split("\n")
          .reduce((total, line) => {
            if (line.startsWith("dir ")) {
              return total;
            } else {
              const [size] = line.split(" ");
              return total + parseInt(size, 10);
            }
          }, 0);

        for (let i = 0; i < directories.length; i++) {
          const key = directories.slice(0, i + 1).join("-");
          counts[key] += count;
        }
      } else {
        if (line === "..") {
          directories.pop();
        } else {
          directories.push(line);
          counts[directories.join("-")] = 0;
        }
      }
    });

  return Object.keys(counts).reduce(
    (total, key) => total + (counts[key] > 100000 ? 0 : counts[key]),
    0,
  );
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
        input: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
        expected: 95437,
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
