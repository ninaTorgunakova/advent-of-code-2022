import fs from 'fs';

const maxNSumCalories = (caloriesForElves, count) => {
    const sums = [];
    for (let i = 0; i < caloriesForElves.length; i++) {
        sums.push(caloriesForElves[i].split('\n').map(x => parseInt(x, 10)).reduce((acc, cur) => acc + cur, 0));
    }
    return sums.sort((a, b) => a - b).slice(-count).reduce((acc, cur) => acc + cur, 0);
}

const caloriesForElves = fs
    .readFileSync('day-01.txt', { encoding: 'utf-8' })
    .split('\n\n')
    .filter(x => !!x);

console.log(maxNSumCalories(caloriesForElves, 1));
console.log(maxNSumCalories(caloriesForElves, 3));
