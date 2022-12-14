import fs from 'fs';

const simulateSandFalling = (cave, isBlocked) => {
    if (isBlocked) {
        cave[max.y + 2].fill('#');
    }
    let unitsOfSand = 0;
    let isRest = true;
    while (cave[0][500] === '.' && isRest) {
        let sandPos = { x: 500, y: 0 };
        isRest = false;
        while (cave[sandPos.y + 1] && !isRest) {
            if (cave[sandPos.y + 1][sandPos.x] === '.') {
                sandPos.y++;
            } else if (cave[sandPos.y + 1][sandPos.x + 1] === '.') {
                sandPos.y++;
                sandPos.x++;
            } else if (cave[sandPos.y + 1][sandPos.x - 1] === '.') {
                sandPos.y++;
                sandPos.x--;
            } else {
                cave[sandPos.y][sandPos.x] = 'o';
                isRest = true;
                unitsOfSand++;
            }
        }
    }
    return unitsOfSand;
}

let max = { x: 0, y: 0 };
const getRocks = () => {
    return fs.readFileSync('day-14.txt').toString().split('\n').filter(x => !!x).map(rock =>
        rock.split(' -> ').map(line => {
            const [x, y] = line.split(',').map(n => +n);
            max.x = Math.max(max.x, x);
            max.y = Math.max(max.y, y);
            return { x, y };
        }),
    );
}

const rocks = getRocks();
const cave = new Array(max.y * 2).fill(0).map(() => new Array(max.x * 2).fill('.'));
for (const rock of rocks) {
    for (let i = 0; i < rock.length - 1; i++) {
        if (rock[i].x === rock[i + 1].x) {
            for (let y = Math.min(rock[i].y, rock[i + 1].y); y <= Math.max(rock[i].y, rock[i + 1].y); y++) {
                cave[y][rock[i].x] = '#';
            }
        } else {
            for (let x = Math.min(rock[i].x, rock[i + 1].x); x <= Math.max(rock[i].x, rock[i + 1].x); x++) {
                cave[rock[i].y][x] = '#';
            }
        }
    }
}

// console.log(simulateSandFalling(cave, false));
console.log(simulateSandFalling(cave, true));
