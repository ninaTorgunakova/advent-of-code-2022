import fs from 'fs';

const OFFSET_LOWERCASE = 96;
const OFFSET_UPPERCASE = 38;

const getTotalPrioritiesSum = (rucksacks) => {
    let totalSum = 0;
    rucksacks.forEach(rucksack => {
        const firstSection = [...new Set(rucksack.slice(0, rucksack.length / 2).split(''))].join('');
        const secondSection = [...new Set(rucksack.slice(rucksack.length / 2).split(''))].join('');
        totalSum += getRucksackPrioritiesSum(firstSection, secondSection);
    });
    return totalSum;
}

const getRucksackPrioritiesSum = (firstSection, secondSection) => {
    let sum = 0;
    for (let item of firstSection) {
        if (secondSection.includes(item)) {
            if (item.toLowerCase() === item) {
                sum += item.charCodeAt(0) - OFFSET_LOWERCASE;
            } else if (item.toUpperCase() === item) {
                sum += item.charCodeAt(0) - OFFSET_UPPERCASE;
            } 
        }
    }
    return sum;
}

const getTotalGroupPrioritiesSum = (rucksacks) => {
    let totalSum = 0;
    for (let i = 0; i < rucksacks.length; i += 3) {
        const first = [...new Set(rucksacks[i].split(''))].join('');
        const second = [...new Set(rucksacks[i + 1].split(''))].join('');
        const third = [...new Set(rucksacks[i + 2].split(''))].join('');
        totalSum += getGroupPrioritiesSum([first, second, third]);
    }
    return totalSum;
}

const getGroupPrioritiesSum = (groupRucksaks) => {
    let sum = 0;
    for (let item of groupRucksaks[0]) {
        if (groupRucksaks[1].includes(item) && groupRucksaks[2].includes(item)) {
            if (item.toLowerCase() === item) {
                sum += item.charCodeAt(0) - OFFSET_LOWERCASE;
            } else if (item.toUpperCase() === item) {
                sum += item.charCodeAt(0) - OFFSET_UPPERCASE;
            } 
        }
    }
    return sum;
}

const rucksacks = fs
    .readFileSync('day-03.txt', { encoding: 'utf-8' })
    .split('\n')
    .filter(x => !!x);

console.log(getTotalPrioritiesSum(rucksacks));
console.log(getTotalGroupPrioritiesSum(rucksacks));
