import fs from 'fs';

const getCountFullyContains = (pairs) => {
	let countFullyContains = 0;
	pairs.forEach(pair => {
		const [first, second] = pair.split(',');
		const [firstMin, firstMax] = first.split('-').map(x => parseInt(x, 10));
		const [secondMin, secondMax] = second.split('-').map(x => parseInt(x, 10));
		if (isFullyContains(firstMin, firstMax, secondMin, secondMax)) {
			countFullyContains++;
		}
	});
	return countFullyContains;
}

const isFullyContains = (firstMin, firstMax, secondMin, secondMax) => {
	if (firstMin <= secondMin && firstMax >= secondMax) {
		return true;
	}
	if (secondMin <= firstMin && secondMax >= firstMax) {
		return true;
	}
	return false;
}

const getCountOverlapped = (pairs) => {
	let countOverlapped = 0;
	pairs.forEach(pair => {
		const [first, second] = pair.split(',');
		const [firstMin, firstMax] = first.split('-').map(x => parseInt(x, 10));
		const [secondMin, secondMax] = second.split('-').map(x => parseInt(x, 10));
		if (isOverlapped(firstMin, firstMax, secondMin, secondMax) || 
			isFullyContains(firstMin, firstMax, secondMin, secondMax)) {
			countOverlapped++;
		}
	});
	return countOverlapped;
}

const isOverlapped = (firstMin, firstMax, secondMin, secondMax) => {
	if (firstMin <= secondMin && firstMax <= secondMax && firstMax >= secondMin) {
		return true;
	}
	if (secondMin <= firstMin && secondMax <= firstMax && secondMax >= firstMin) {
		return true;
	}
	return false;
}

const pairs = fs
	.readFileSync('day-04.txt', { encoding: 'utf-8' })
	.split('\n')
	.filter(x => !!x);

console.log(getCountFullyContains(pairs));
console.log(getCountOverlapped(pairs));
