const Memory = require('../day6/memory');

describe('Day 6', () => {
    describe('Part 1', () => {
        it('can do the memory allocation', () => {
            const memory = new Memory([0, 2, 7, 0]);
            expect(memory.reallocate()).toBe(5);
        });
    });

    describe('Part 2', () => {
        it('can calculate the infinie loop cycle', () => {
            const memory = new Memory([0, 2, 7, 0]);
            memory.reallocate();

            expect(memory.getCyclesInInfiniteLoopAfterReallocation()).toBe(4);
        });
    });
});