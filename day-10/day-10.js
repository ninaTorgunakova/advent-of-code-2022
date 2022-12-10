import fs from 'fs';

let signalsSum = 0;
let curCycle = 0;
let x = 1;
let CRTresult = '';

const executeCycleVar1 = () => {
    curCycle++;
    if ([20, 60, 100, 140, 180, 220].includes(curCycle)) {
        signalsSum += x * curCycle;
    }
}

const executeCycleVar2 = () => {
    if (curCycle % 40 === 0) {
        CRTresult += '\n';
    }
    CRTresult += Math.abs((curCycle % 40) - x) <= 1 ? '#' : '.';
    curCycle++;
}

const executeNoop = (isCRT) => {
    if (isCRT) {
        executeCycleVar2();
    } else {
        executeCycleVar1();
    }
}

const OCR = (CRTresult) => {
    const ALPHABET = {
        '.##.#..##..######..##..#': 'A',
        '###.#..####.#..##..####.': 'B',
        '.##.#..##...#...#..#.##.': 'C',
        '#####...###.#...#...####': 'E',
        '#####...###.#...#...#...': 'F',
        '.##.#..##...#.###..#.###': 'G',
        '#..##..######..##..##..#': 'H',
        '.###..#...#...#...#..###': 'I',
        '..##...#...#...##..#.##.': 'J',
        '#..##.#.##..#.#.#.#.#..#': 'K',
        '#...#...#...#...#...####': 'L',
        '.##.#..##..##..##..#.##.': 'O',
        '###.#..##..####.#...#...': 'P',
        '###.#..##..####.#.#.#..#': 'R',
        '.####...#....##....####.': 'S',
        '#..##..##..##..##..#.##.': 'U',
        '#...#....#.#..#...#...#.': 'Y',
        '####...#..#..#..#...####': 'Z'
    };
    let CRTlines = CRTresult.trim().split('\n');
    let result = '';
    for (let i = 0; i < 8; i++) {
        const letter = CRTlines.map(line => line.slice(i * 5, i * 5 + 4));
        result += ALPHABET[letter.join('')];
    }
    return result;
}

const executeAddX = (instruction, isCRT) => {
    if (isCRT) {
        executeCycleVar2();
        executeCycleVar2();
    } else {
        executeCycleVar1();
        executeCycleVar1();
    }
    x += parseInt(instruction.split(' ')[1], 10);
}

const getSignalsSum = (instructions, isCRT) => {
    for (const instruction of instructions) {
        if (instruction === 'noop') {
            executeNoop(isCRT);
        }
        else {
            executeAddX(instruction, isCRT);
        }
    }
    return isCRT ? OCR(CRTresult) : signalsSum;
}

let instructions = fs
    .readFileSync('day-10.txt', { encoding: 'utf-8' })
    .split('\n')
    .filter (x => !!x);

// console.log(getSignalsSum(instructions, false));
console.log(getSignalsSum(instructions, true));
