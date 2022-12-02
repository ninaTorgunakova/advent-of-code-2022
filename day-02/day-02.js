import fs from 'fs';

const COUNT_WIN = 6;
const COUNT_DRAW = 3;
const COUNT_LOST = 0;

const ROCK_SCORE = 1;
const PAPER_SCORE = 2;
const SCISSORS_SCORE = 3;

const getYourTotalScore = (gameMoves, isFirstGame) => {
    let totalScore = 0;
    for (let i = 0; i < gameMoves.length; i++) {
        const [opponentChoice, yourChoice] = gameMoves[i].split(' ');
        totalScore += isFirstGame ?
            getYourFirstGameScore(opponentChoice, yourChoice) :
            getYourSecondGameScore(opponentChoice, yourChoice);
    }
    return totalScore;
}

const getYourFirstGameScore = (opponentChoice, yourChoice) => {
    const ROCK_VALUES = ['A', 'X'];
    const PAPER_VALUES = ['B', 'Y'];
    const SCISSORS_VALUES = ['C', 'Z'];
    if (ROCK_VALUES.includes(opponentChoice)) {
        if (ROCK_VALUES.includes(yourChoice)) {
            return COUNT_DRAW + ROCK_SCORE;
        }
        if (PAPER_VALUES.includes(yourChoice)) {
            return COUNT_WIN + PAPER_SCORE;
        }
        if (SCISSORS_VALUES.includes(yourChoice)) {
            return COUNT_LOST + SCISSORS_SCORE;
        }
    }
    if (PAPER_VALUES.includes(opponentChoice)) {
        if (ROCK_VALUES.includes(yourChoice)) {
            return COUNT_LOST + ROCK_SCORE;
        }
        if (PAPER_VALUES.includes(yourChoice)) {
            return COUNT_DRAW + PAPER_SCORE;
        }
        if (SCISSORS_VALUES.includes(yourChoice)) {
            return COUNT_WIN + SCISSORS_SCORE;
        }
    }
    if (SCISSORS_VALUES.includes(opponentChoice)) {
        if (ROCK_VALUES.includes(yourChoice)) {
            return COUNT_WIN + ROCK_SCORE;
        }
        if (PAPER_VALUES.includes(yourChoice)) {
            return COUNT_LOST + PAPER_SCORE;
        }
        if (SCISSORS_VALUES.includes(yourChoice)) {
            return COUNT_DRAW + SCISSORS_SCORE;
        }
    }
}

const getYourSecondGameScore = (opponentChoice, yourChoice) => {
    const ROCK_VALUE = 'A';
    const PAPER_VALUE = 'B';
    const SCISSORS_VALUE = 'C';
    const SHOULD_WIN = 'Z';
    const SHOULD_LOSE = 'X';
    const SHOULD_DRAW = 'Y';
    if (ROCK_VALUE === opponentChoice) {
        if (SHOULD_WIN === yourChoice) {
            return COUNT_WIN + PAPER_SCORE;
        }
        if (SHOULD_LOSE === yourChoice) {
            return COUNT_LOST + SCISSORS_SCORE;
        }
        if (SHOULD_DRAW === yourChoice) {
            return COUNT_DRAW + ROCK_SCORE;
        }
    }
    if (PAPER_VALUE === opponentChoice) {
        if (SHOULD_WIN === yourChoice) {
            return COUNT_WIN + SCISSORS_SCORE;
        }
        if (SHOULD_LOSE === yourChoice) {
            return COUNT_LOST + ROCK_SCORE;
        }
        if (SHOULD_DRAW === yourChoice) {
            return COUNT_DRAW + PAPER_SCORE;
        }
    }
    if (SCISSORS_VALUE === opponentChoice) {
        if (SHOULD_WIN === yourChoice) {
            return COUNT_WIN + ROCK_SCORE;
        }
        if (SHOULD_LOSE === yourChoice) {
            return COUNT_LOST + PAPER_SCORE;
        }
        if (SHOULD_DRAW === yourChoice) {
            return COUNT_DRAW + SCISSORS_SCORE;
        }
    }
}

const gameMoves = fs
    .readFileSync('day-02.txt', { encoding: 'utf-8' })
    .split('\n')
    .filter(x => !!x);

console.log(getYourTotalScore(gameMoves, true));
console.log(getYourTotalScore(gameMoves, false));
