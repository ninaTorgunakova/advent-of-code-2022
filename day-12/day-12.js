import fs from 'fs';

const BFS = (startPos) => {
  let queue = [[startPos, 0]];
  const indexCache = new Set([startPos]);
  while (queue.length) {
    const [position, stepCount] = queue.shift();
    if (position === endPos) {
      return stepCount;
    }
    const res = [
      1 + position,
      -1 + position,
      gridLetters[0].length + position,
      -gridLetters[0].length + position
    ].filter(index => gridCodes[index] <= gridCodes[position] + 1 && !indexCache.has(index));
    res.forEach(index => indexCache.add(index));
    queue = [...queue, ...res.map(code => [code, stepCount + 1])];
  }
  return Infinity;
};

const gridLetters = fs.readFileSync('day-12.txt').toString().split('\n');
const gridCodes = [];
gridLetters.forEach(row => {
  row.split('').forEach(letter => gridCodes.push(letter.charCodeAt(0)))
});
const startPos = gridCodes.findIndex(i => i === 'S'.charCodeAt(0));
const endPos = gridCodes.findIndex(i => i === 'E'.charCodeAt(0));
gridCodes[startPos] = 'a'.charCodeAt(0);
gridCodes[endPos] = 'z'.charCodeAt(0);

console.log(BFS(startPos));
console.log(gridCodes.map((code, i) => ({ code, startPos: i }))
  .filter(({ code }) => code === 'a'.charCodeAt(0))
  .map(({ startPos }) => BFS(startPos))
  .reduce((acc, cur) => (acc < cur ? acc : cur))
);
