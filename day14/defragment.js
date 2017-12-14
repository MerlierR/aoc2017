const { hash } = require('../day10/knotHash');

module.exports = { countRegions, count, createGrid, hexToBitString };

function countRegions(/**string[][]*/ grid) {
    let copy = grid.map((row) => [...row]);
    const iMax = grid.length;
    const jMax = grid[0].length;

    let region = 0;

    let i = 0;
    while (i < iMax) {
        let j = 0;
        while (j < jMax) {
            if (copy[i][j] === '#') {
                setRegion(copy, i, j, region, iMax, jMax);
                region += 1;
            }

            j += 1;
        }

        i += 1;
    }

    return region;
}

function setRegion(/**string[][]*/ grid, i, j, region, iMax, jMax) {
    if (i >= 0 && i < iMax && j >= 0 && j < jMax && grid[i][j] === '#') {
        grid[i][j] = region;

        setRegion(grid, i - 1, j, region, iMax, jMax);
        setRegion(grid, i + 1, j, region, iMax, jMax);

        setRegion(grid, i, j - 1, region, iMax, jMax);
        setRegion(grid, i, j + 1, region, iMax, jMax);
    }
}

function count(/**string[][]*/ grid) {
    return grid.reduce((acc, row) => acc + row.reduce((bcc, bit) => bcc + (bit === '#' ? 1 : 0), 0), 0);
}

function createGrid(/**string*/ keyString) {
    return [...new Array(128).keys()]
        .map((index) => hash(`${keyString}-${index}`))
        .map((hexString) => hexToBitString(hexString))
        .map((bitString) => bitString.split('').map((bit) => bit === '1' ? '#' : '.'));
}

function hexToBitString(/**string*/ input) {
    const copy = input.split('');
    return copy.reduce((acc, bit) => acc + parseInt(bit, 16).toString(2).padStart(4, '0'), '');
}