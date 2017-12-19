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
        const { chars, numberOfSteps } = followMaze(readTestFile());
        expect(chars).toBe('ABCDEF');
        expect(numberOfSteps).toBe(38);
    });

    it('can follow the huge path', () => {
        const { chars, numberOfSteps } = followMaze(readTestFile('../day19/input.txt'));
        expect(chars).toBe('EPYDUXANIT');
        expect(numberOfSteps).toBe(17544);
    });

});

function readTestFile(filename = 'day19.input.txt') {
    const file = path.join(__dirname, filename);
    expect(fs.existsSync(file)).toBe(true);

    const data = fs.readFileSync(file, 'utf8');
    expect(data).toBeDefined();

    return data;
}