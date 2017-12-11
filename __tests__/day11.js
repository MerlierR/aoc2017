const { parseSteps } = require('../day11/hexGrid');

describe('Day 11: Hex Ed', () => {

    [
        { input: 'ne,ne,ne', steps: 3 },
        { input: 'ne,ne,sw,sw', steps: 0 },
        { input: 'ne,ne,s,s', steps: 2 },
        { input: 'se,sw,se,sw,sw', steps: 3 }
    ].forEach((entry) => it(`can calculate the steps (${entry.steps}) for "${entry.input}"`, () => {
        const cell = parseSteps(entry.input);
        expect(cell.distance()).toBe(entry.steps);
    }));

});