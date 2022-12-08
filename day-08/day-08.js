import fs from 'fs';

const setVisibility = (tree, max) => {
    if (tree.height > max) {
        tree.visible = true;
    }
}

const getAmountVisibility = (trees) => {
    const matrix = trees.map(row => row.split('').map(x => ({ height: parseInt(x, 10), visibility: false })));
    for (let i = 0; i < matrix.length; i++) {
        for (let k = 0, max = -1; k < matrix[i].length; k++) {
            setVisibility(matrix[i][k], max);
            max = Math.max(max, matrix[i][k].height);
        }
        for (let k = matrix[i].length - 1, max = -1; k >= 0; k--) {
            setVisibility(matrix[i][k], max);
            max = Math.max(max, matrix[i][k].height);
        }
    }
    for (let k = 0; k < matrix[0].length; k++) {
        for (let i = 0, max = -1; i < matrix.length; i++) {
            setVisibility(matrix[i][k], max);
            max = Math.max(max, matrix[i][k].height);
        }
        for (let i = matrix.length - 1, max = -1; i >= 0; i--) {
            setVisibility(matrix[i][k], max);
            max = Math.max(max, matrix[i][k].height);
        }
    }
    return matrix.reduce((acc, cur) => acc += cur.filter(tree => tree.visible).length, 0);
}

const getScenicScore = (matrix, i, k) => {
    let scroreRight = 0;
    for (let row = i + 1; row < matrix.length; row++) {
        scroreRight++;
        if (matrix[row][k].height >= matrix[i][k].height) {
            break;
        }
    }
    let scoreLeft = 0;
    for (let row = i - 1; row >= 0; row--) {
        scoreLeft++;
        if (matrix[row][k].height >= matrix[i][k].height) {
            break;
        }
    }
    let scoreDown = 0;
    for (let col = k + 1; col < matrix[0].length; col++) {
        scoreDown++;
        if (matrix[i][col].height >= matrix[i][k].height) {
            break;
        }
    }
    let scoreUp = 0;
    for (let col = k - 1; col >= 0; col--) {
        scoreUp++;
        if (matrix[i][col].height >= matrix[i][k].height) {
            break;
        }
    }
    return scroreRight * scoreLeft * scoreDown * scoreUp;
}

const getHighestScenicScore = (trees) => {
    const matrix = trees.map(row => row.split('').map(x => ({ height: parseInt(x, 10), visibility: false })));
    let highestScenicScore = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let k = matrix[i].length - 1; k >= 0; k--) {
            highestScenicScore = Math.max(getScenicScore(matrix, i, k), highestScenicScore);
        }
    }
    return highestScenicScore;
}

let trees = fs
	.readFileSync('day-08.txt', { encoding: 'utf-8' })
	.split('\n')
    .filter(x => !!x);

console.log(getAmountVisibility(trees));
console.log(getHighestScenicScore(trees));
