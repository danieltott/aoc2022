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

type Directory = Record<string, { count: number; parent: string }>;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let level = -1;
  let curDirectory: string = "";
  const directories: Directory[] = [];

  input
    .split(/\$ cd (.*)\n|\$ ls\n/)
    .filter(Boolean)
    .forEach((line) => {
      console.log("---");
      console.log(line.trim());
      console.log("---");
      console.log(level, curDirectory);
      console.log("---");
      if (line.match(/\n/)) {
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

        let totalDirectory = curDirectory;

        for (let i = level; i > -1; i--) {
          // console.log(totalDirectory, i);
          directories[i][totalDirectory].count += count;
          totalDirectory = directories[i][totalDirectory].parent;
        }
      } else {
        if (line === "..") {
          curDirectory = directories[level][curDirectory].parent;
          level--;
        } else {
          level++;
          if (directories[level] === undefined) {
            directories[level] = {};
          }
          directories[level][line] = { count: 0, parent: curDirectory };
          curDirectory = line;
        }
      }
    });

  console.log(directories);

  return directories.reduce((total, directory) => {
    return (
      total +
      Object.keys(directory).reduce((dirTotal, key) => {
        return (
          dirTotal + (directory[key].count >= 100000 ? 0 : directory[key].count)
        );
      }, 0)
    );
  }, 0);
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
  onlyTests: true,
});
