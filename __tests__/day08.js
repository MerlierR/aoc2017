const fs = require('fs');
const path = require('path');

const { parseInstructionSet, findLargestVal } = require('../day08/register');

describe('Day 8', () => {
    it('can find the largest value in the register', () => {
        const file = path.join(__dirname, 'day08.txt');
        expect(fs.existsSync(file)).toBe(true);

        const data = fs.readFileSync(file, 'utf8');
        const vars = parseInstructionSet(data);
        const largestVal = findLargestVal(vars);

        expect(largestVal).toBe(1);
    });
});