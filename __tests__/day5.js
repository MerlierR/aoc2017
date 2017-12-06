const { solveMaze, plusOneOffsetRule, threeOrMoreOffsetRule } = require('../day5/maze');

describe('Day 5: Maze', () => {
    describe('Part 1: plus 1 offset rule', () => {

        it('can solve a maze correctly', () => {
            const maze = [0, 3, 0, 1, -3];
            expect(solveMaze(maze, plusOneOffsetRule)).toBe(5);
        });

    });

    describe('Part 2: >=3 offset rule', () => {

        it('can solve a maze correctly', () => {
            const maze = [0, 3, 0, 1, -3];
            expect(solveMaze(maze, threeOrMoreOffsetRule)).toBe(10);
        });

    });
});