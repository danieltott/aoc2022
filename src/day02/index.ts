import run from "aocrunner";

type PlayerAValue = "A" | "B" | "C";
type PlayerBValue = "X" | "Y" | "Z";

enum Actions {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

const actionDict = {
  A: Actions.Rock,
  B: Actions.Paper,
  C: Actions.Scissors,
  X: Actions.Rock,
  Y: Actions.Paper,
  Z: Actions.Scissors,
};

function getRound2Action(
  playerAAction: Actions,
  playerB: PlayerBValue,
): Actions {
  console.log({ playerAAction, playerB });
  switch (playerAAction) {
    case Actions.Rock:
      switch (playerB) {
        // lose
        case "X":
          return Actions.Scissors;
        // tie
        case "Y":
          return Actions.Rock;
        // win
        case "Z":
          return Actions.Paper;
      }
    case Actions.Paper:
      switch (playerB) {
        // lose
        case "X":
          return Actions.Rock;
        // tie
        case "Y":
          return Actions.Paper;
        // win
        case "Z":
          return Actions.Scissors;
      }
    case Actions.Scissors:
      switch (playerB) {
        // lose
        case "X":
          return Actions.Paper;
        // tie
        case "Y":
          return Actions.Scissors;
        // win
        case "Z":
          return Actions.Rock;
      }

    default:
      throw new Error("Invalid action");
  }
}

function roundResult(playerAAction: Actions, playerBAction: Actions): number {
  if (playerAAction === playerBAction) {
    return 3;
  }

  switch (playerAAction) {
    case Actions.Rock:
      switch (playerBAction) {
        case Actions.Paper:
          return 6;
        case Actions.Scissors:
          return 0;
      }
    case Actions.Paper:
      switch (playerBAction) {
        case Actions.Scissors:
          return 6;
        case Actions.Rock:
          return 0;
      }
    case Actions.Scissors:
      switch (playerBAction) {
        case Actions.Rock:
          return 6;
        case Actions.Paper:
          return 0;
      }

    default:
      throw new Error("Invalid action");
  }
}

function roundScore(playerAAction: Actions, playerBAction: Actions): number {
  return roundResult(playerAAction, playerBAction) + playerBAction;
}

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((total, round) => {
    const [playerA, playerB] = round.split(" ") as [PlayerAValue, PlayerBValue];
    return total + roundScore(actionDict[playerA], actionDict[playerB]);
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((total, round) => {
    const [playerA, playerB] = round.split(" ") as [PlayerAValue, PlayerBValue];
    const playerAAction = actionDict[playerA];
    const playerBAction = getRound2Action(playerAAction, playerB);
    console.log({
      playerAAction,
      playerBAction,
      roundScore: roundScore(playerAAction, playerBAction),
      total,
    });
    return total + roundScore(playerAAction, playerBAction);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
B X
C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
