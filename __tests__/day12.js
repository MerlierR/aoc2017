const fs = require('fs');
const path = require('path');
const { parseInput } = require('../day12/plumber');

describe('Day 12: Digital Plumber', () => {
    it('can count the connections to "0"', () => {
        const file = path.join(__dirname, 'day12.input.txt');
        expect(fs.existsSync(file)).toBe(true);

        const input = fs.readFileSync(file, 'utf8');
        const nodeList = parseInput(input);

        expect(nodeList.countConnectionsTo(0)).toBe(6);
    });

    it('can count the number of groups', () => {
        const file = path.join(__dirname, 'day12.input.txt');
        expect(fs.existsSync(file)).toBe(true);

        const input = fs.readFileSync(file, 'utf8');
        const nodeList = parseInput(input);

        expect(nodeList.countGroups()).toBe(2);
    });
});