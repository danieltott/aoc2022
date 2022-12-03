import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

function getValueFromLetter(letter: string): number {
  const charCode = letter.charCodeAt(0);
  if (charCode > 90) {
    // lowercase
    return charCode - 96;
  }
  // uppercase
  return charCode - 38;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((total, rucksack) => {
    const compartment1 = rucksack.substring(0, rucksack.length / 2).split("");
    const compartment2 = rucksack.substring(rucksack.length / 2).split("");

    return (
      total +
      [
        ...new Set(
          compartment1.filter((letter) => compartment2.includes(letter)),
        ),
      ].reduce((total, letter) => {
        return total + getValueFromLetter(letter);
      }, 0)
    );
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let total = 0;
  for (let i = 0; i < input.length; i = i + 3) {
    const elf1 = input[i].split("");
    const elf2 = input[i + 1].split("");
    const elf3 = input[i + 2].split("");

    const badgeValue = getValueFromLetter(
      [
        ...new Set(
          elf1
            .filter((letter) => elf2.includes(letter))
            .filter((letter) => elf3.includes(letter)),
        ),
      ][0],
    );

    total = total + badgeValue;
  }

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
