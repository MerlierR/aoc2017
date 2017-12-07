const Memory = require('../day6/memory');

describe('Day 6', () => {
    describe('Part 1', () => {
        it('Can do the memory allocation', () => {
            const memory = new Memory([0, 2, 7, 0]);
            expect(memory.reallocate()).toBe(5);
        });
    });
});