import fs from 'fs';

const getMonkeyBusinessLevel = (rounds, monkeys) => {
    const base = monkeys.reduce((prev, monkey) => prev * monkey.divisible, 1);
    for (let i = 0; i < rounds; i++) {
        for (const monkey of monkeys) {
            while (monkey.items.length > 0) {
                let worry = monkey.operation(monkey.items.shift());
                worry = rounds > 20 ? worry % base : Math.floor(worry / 3);
                const condition = worry % monkey.divisible === 0 ? monkey.positive : monkey.negative;
                monkeys[condition].items.push(worry);
                monkey.level++;
            }
        }
    }
    monkeys.sort((a, b) => b.level - a.level);
    return monkeys[0].level * monkeys[1].level;
}

const parseMonkey = (monkey) => {
    const lines = monkey.split('\n');
    const [, items] = lines[1].split(': ');
    const numRegExp = /\d+$/;
    const [newOperation] = lines[2].match(/(old|\d+) (\*|\+) (old|\d+)$/);
    return {
        items: items.split(', ').map(x => parseInt(x, 10)),
        operation: new Function('old', `return ${newOperation}`),
        divisible: parseInt(lines[3].match(numRegExp)[0], 10),
        positive: parseInt(lines[4].match(numRegExp)[0], 10),
        negative: parseInt(lines[5].match(numRegExp)[0], 10),
        level: 0
    };
}

const monkeys = fs.readFileSync('day-11.txt', { encoding: 'utf-8' })
    .trim()
    .split('\n\n')
    .map(monkey => parseMonkey(monkey));

console.log(getMonkeyBusinessLevel(20, monkeys));
// console.log(getMonkeyBusinessLevel(10000, monkeys));
