import fs from 'fs';

const areAllDifferent = (buffer) => buffer.length === new Set(buffer).size;

const findFirstMarker = (buffer, countDistinct) => {
    for (let i = 0; i < buffer.length - countDistinct; i++) {
        if (areAllDifferent(buffer.slice(i, i + countDistinct))) {
            return i + countDistinct;
        }
    }
    return -1;
}

const buffer = fs.readFileSync('day-06.txt', { encoding: 'utf-8' }).split('');

console.log(findFirstMarker(buffer, 4));
console.log(findFirstMarker(buffer, 14));
