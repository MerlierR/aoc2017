const { hash } = require('../day10/knotHash');

module.exports = { defragment, count, createGrid, hexToBitString };

function defragment(/**string*/ keyString) {

}

function count(/**number[][]*/ grid) {
    return grid.reduce((acc, row) => acc + row.reduce((bcc, bit) => bcc + bit, 0), 0);
}

function createGrid(/**string*/ keyString) {
    return [...new Array(128).keys()]
        .map((index) => hash(`${keyString}-${index}`))
        .map((hexString) => hexToBitString(hexString))
        .map((bitString) => bitString.split('').map((bit) => parseInt(bit)));
}

function hexToBitString(/**string*/ input) {
    const copy = input.split('');
    return copy.reduce((acc, bit) => acc + parseInt(bit, 16).toString(2).padStart(4, '0'), '');
}