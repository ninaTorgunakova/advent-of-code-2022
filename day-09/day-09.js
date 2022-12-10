import fs from 'fs';

const getPositions = (steps, length) => {
	const visitedPositions = new Set([`0, 0`]);
	const positions = new Array(length).fill(0).map(_ => ({ x: 0, y: 0 }));
	for (const [direction, count] of steps) {
	  for (let i = 0; i < parseInt(count, 10); i++) {
		switch (direction) {
			case 'R':
				positions[0].x++;
				break;
			case 'L':
				positions[0].x--;
				break;
			case 'D':
				positions[0].y++;
				break;
			case 'U':
				positions[0].y--;
				break;
		}
		for (let k = 1; k < positions.length; k++) {
			const [H, T] = [positions[k - 1], positions[k]];
			if (Math.abs(H.x - T.x) === 2 || Math.abs(H.y - T.y) === 2) {
				T.x = H.x === T.x ? T.x : H.x > T.x ? T.x + 1 : T.x - 1;
				T.y = H.y === T.y ? T.y : H.y > T.y ? T.y + 1 : T.y - 1;
			}
		}
		visitedPositions.add(`${positions[length - 1].x}, ${positions[length - 1].y}`);
	  }
	}
	return visitedPositions.size;
  }

let steps = fs
	.readFileSync('day-09.txt', { encoding: 'utf-8' })
	.split('\n')
	.map(direction => direction.split(' '));;

console.log(getPositions(steps, 2));
console.log(getPositions(steps, 10));
