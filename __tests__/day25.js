const fs = require('fs');
const path = require('path');

const parseStates = require('../day25/states');
const checksum = require('../day25/checksum');

describe('Day 25: The Halting Problem', () => {

    const data = `
Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`.trim();


    it('can parse the input', () => {
        const { start, numberOfIterations, states } = parseStates(data);

        expect(start).toBe('A');
        expect(numberOfIterations).toBe(6);

        expect(states.get('A')).toBeDefined();
        expect(states.get('B')).toBeDefined();
        expect(states.get('C')).not.toBeDefined();
    });


    it('can parse the real input', () => {
        const filePath = path.join(__dirname, '../day25/input.txt');
        const realData = fs.readFileSync(filePath, 'utf8');
        const { start, numberOfIterations, states } = parseStates(realData);

        expect(start).toBe('A');
        expect(numberOfIterations).toBe(12134527);

        expect(states.get('A')).toBeDefined();
        expect(states.get('B')).toBeDefined();
        expect(states.get('C')).toBeDefined();
        expect(states.get('D')).toBeDefined();
        expect(states.get('E')).toBeDefined();
        expect(states.get('F')).toBeDefined();
    });

    it('can calculate the checksum', () => {
        expect(checksum(data)).toBe(3);
    });
});