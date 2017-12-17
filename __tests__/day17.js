const { spinLock } = require('../day17/spinLock');

describe('Day 17: SpinLock', () => {
    const input = 3;

    it(`can find the first value AFTER 2017 for input ${input}`, () => {
        const { buffer, position } = spinLock(input);

        expect(buffer[position]).toBe(2017);
        expect(buffer[(position + 1) % buffer.length]).toBe(638);
    });
});