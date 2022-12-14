import fs from 'fs';

const cmpFn = (a, b) => {
    if (!a || !b) {
        return;
    }
    for (let i = 0; i < a.length && i < b.length; i++) {
        if (Number.isInteger(a[i]) && Number.isInteger(b[i])) {
            if (a[i] !== b[i]) {
                return a[i] - b[i];
            }
        } else {
            const result = cmpFn(Number.isInteger(a[i]) ? [a[i]] : a[i], Number.isInteger(b[i]) ? [b[i]] : b[i]);
            if (result !== 0) {
                return result;
            }
        }
    }
    return a.length - b.length;
}
  
const getPairIndicesSum = lists => {
    const pairIndices = lists.split('\n\n')
        .map(pair => pair.split('\n')
        .map(x => JSON.parse(x)))
        .map((pair, i) => cmpFn(...pair) < 0 ? i + 1 : 0);
    return pairIndices.reduce((acc, cur) => acc + cur);
  }
  
const getDecoderKey = (lists) => {
    const dividers = [[[2]], [[6]]];
    const list = lists.replaceAll('\n\n', '\n')
        .split('\n')
        .map(x => JSON.parse(x))
        .concat(dividers)
        .sort((a, b) => cmpFn(a, b));
    return dividers.map(x => list.indexOf(x) + 1).reduce((a, b) => a * b);
}

const lists = fs.readFileSync('day-13.txt').toString();
    
console.log(getPairIndicesSum(lists));
console.log(getDecoderKey(lists));
