const manhattanDistance = require('../day3/manhattanDistance');

describe('Day 3: Manhattan Distance', () => {
    describe('Part 1', () => {
        [
            { input: 1, distance: 0 },
            { input: 12, distance: 3 },
            { input: 23, distance: 2 },
            { input: 1024, distance: 31 }
        ].forEach((entry) => it(`Can calculate the manhattan distance (${entry.distance}) for "${entry.input}"`, () => {
            expect(manhattanDistance(entry.input)).toBe(entry.distance);
        }));
    });
});