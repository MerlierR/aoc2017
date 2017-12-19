const fs = require('fs');
const path = require('path');
const { followMaze } = require('../day19/maze');

describe('Day 19: A Series Of Tubes', () => {

    it('can read the input file', () => {
        const data = readTestFile();
        const lines = data.split('\n');
        expect(lines.length).toBe(7);
    });

    it('can follow the path', () => {
        expect(followMaze(readTestFile())).toBe('ABCDEF');
    });

    it('can follow the huge path', () => {
        expect(followMaze(readTestFile('../day19/input.txt'))).toBe('EPYDUXANIT');
    });

});

function readTestFile(filename = 'day19.input.txt') {
    const file = path.join(__dirname, filename);
    expect(fs.existsSync(file)).toBe(true);

    const data = fs.readFileSync(file, 'utf8');
    expect(data).toBeDefined();

    return data;
}