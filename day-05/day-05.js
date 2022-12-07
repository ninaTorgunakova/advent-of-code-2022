import fs from 'fs';

const getCratesOnTopSingleMove = (crates, instructions) => {
	for (let { moveCount, indexFrom, indexTo } of instructions) {
		for (let c = 0; c < moveCount; c++) {
			let crate = crates[indexFrom].pop();
			crates[indexTo].push(crate);
		}
	}
	return crates.map(crate => crate[crate.length - 1]).join('');
}

const getCratesOnTopGroupMove = (crates, instructions) => {
	for (let { moveCount, indexFrom, indexTo } of instructions) {
		let groupCrates = crates[indexFrom].splice(-1 * moveCount, moveCount);
		crates[indexTo].push(...groupCrates);
	}
	return crates.map(crate => crate[crate.length - 1]).join('');
}

const getInstructions = (rawInstructions) => 
	(rawInstructions.split('\n').filter(x => !!x).map(line => {
			let [, moveCount, indexFrom, indexTo] = /move (\d+) from (\d+) to (\d+)/.exec(line);
			moveCount = parseInt(moveCount, 10);
			indexFrom = parseInt(indexFrom, 10) - 1;
			indexTo = parseInt(indexTo, 10) - 1;
	
			return { moveCount, indexFrom, indexTo };
	}));

const getCrates = (rawCrates) => {
	rawCrates = rawCrates.split('\n');
	const length = Math.max(...rawCrates[rawCrates.length - 1].split(' '));
	const stacks = new Array(length).fill(0).map(_ => []);
	for (let i = 0; i < rawCrates.length - 1; i++) {
		let count = 0;
		for (let k = 0; k < rawCrates[i].length; k += 4) {
			if (rawCrates[i][k + 1] !== ' ') {
				stacks[count].unshift(rawCrates[i][k + 1]);
			}
			count++;
		}
	}
	return stacks;
}

let [rawCrates, rawInstructions] = fs
	.readFileSync('day-05.txt', { encoding: 'utf-8' })
	.split('\n\n');

let [crates, instructions] = [getCrates(rawCrates), getInstructions(rawInstructions)];

// console.log(getCratesOnTopSingleMove(crates, instructions));
console.log(getCratesOnTopGroupMove(crates, instructions));
