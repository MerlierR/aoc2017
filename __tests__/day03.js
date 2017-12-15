const manhattanDistance = require('../day03/manhattanDistance');
const { getEdgeIndex } = require('../day03/storageDriver');
const { adjecentSum, getIndices } = require('../day03/adjecentSum');
const EdgeIndex = require('../day03/EdgeIndex');

describe('Day 3: Experimental Storage', () => {
    describe('Part 1: Manhattan Distance', () => {
        [
            { input: 1, distance: 0 },
            { input: 12, distance: 3 },
            { input: 23, distance: 2 },
            { input: 1024, distance: 31 }
        ].forEach((entry) => it(`Can calculate the manhattan distance (${entry.distance}) for "${entry.input}"`, () => {
            expect(manhattanDistance(entry.input)).toBe(entry.distance);
        }));
    });

    describe('EdgeIndex', () => {
        [1, 7, 22, 13, 9, 46, 1024].forEach((number) => {
            it(`can calculate the real index of "${number}"`, () => {
                const edgeIndex = getEdgeIndex(number);

                expect(edgeIndex.getRealIndex()).toBe(number);
            });
        });

        [22, 13, 46, 1024].forEach((number) => {
            it(`can find the previous index of a regular index (${number})`, () => {
                const edgeIndex = getEdgeIndex(number);

                expect(edgeIndex.previous().getRealIndex()).toBe(number - 1);
            });

            it(`can find the next index of "${number}"`, () => {
                const edgeIndex = getEdgeIndex(number);

                expect(edgeIndex.next().getRealIndex()).toBe(number + 1);
            });
        });

        it('can find the next index of an end (9)', () => {
            expect(getEdgeIndex(9).next().getRealIndex()).toBe(2);
        });

        it('can find the previous index of a beginning (2)', () => {
            expect(getEdgeIndex(2).previous().getRealIndex()).toBe(9);
        });

        it('can find the inner adjecent edge index', () => {
            expect(getEdgeIndex(10).innerAdjecentEdge().getRealIndex()).toBe(9);
            expect(getEdgeIndex(20).innerAdjecentEdge().getRealIndex()).toBe(7);
            expect(getEdgeIndex(22).innerAdjecentEdge().getRealIndex()).toBe(7);
            expect(getEdgeIndex(24).innerAdjecentEdge().getRealIndex()).toBe(9);
            expect(getEdgeIndex(26).innerAdjecentEdge().getRealIndex()).toBe(25);
            expect(getEdgeIndex(27).innerAdjecentEdge().getRealIndex()).toBe(10);
            expect(getEdgeIndex(28).innerAdjecentEdge().getRealIndex()).toBe(11);
        });

        it('can find the inner adjecent corner', () => {
            expect(getEdgeIndex(3).innerAdjecentCorner().getRealIndex()).toBe(1);
            expect(getEdgeIndex(9).innerAdjecentCorner().getRealIndex()).toBe(1);
            expect(getEdgeIndex(25).innerAdjecentCorner().getRealIndex()).toBe(9);
            expect(getEdgeIndex(31).innerAdjecentCorner().getRealIndex()).toBe(13);
            expect(getEdgeIndex(37).innerAdjecentCorner().getRealIndex()).toBe(17);
            expect(getEdgeIndex(21).innerAdjecentCorner().getRealIndex()).toBe(7);
            expect(getEdgeIndex(49).innerAdjecentCorner().getRealIndex()).toBe(25);
        });
    });

    describe('Part 2: Adjecent sum', () => {
        it('Can find adjecent indices for "2"', () => {
            const indices = getIndices(2).map((ei) => ei.getRealIndex());

            expect(indices.length).toBe(1);
            expect(indices.includes(1)).toBe(true);
        });

        it('Can find adjecent indices for "6"', () => {
            const indices = getIndices(6).map((ei) => ei.getRealIndex());

            expect(indices.length).toBe(3);
            expect(indices.includes(1)).toBe(true);
            expect(indices.includes(4)).toBe(true);
            expect(indices.includes(5)).toBe(true);
        });

        it('Can find adjecent indices for "8"', () => {
            const indices = getIndices(8).map((ei) => ei.getRealIndex());

            expect(indices.length).toBe(4);
            expect(indices.includes(1)).toBe(true);
            expect(indices.includes(2)).toBe(true);
            expect(indices.includes(6)).toBe(true);
            expect(indices.includes(7)).toBe(true);
        });

        it('Can find adjecent indices for "11"', () => {
            const indices = getIndices(11).map((ei) => ei.getRealIndex());

            expect(indices.length).toBe(4);
            expect(indices.includes(2)).toBe(true);
            expect(indices.includes(3)).toBe(true);
            expect(indices.includes(9)).toBe(true);
            expect(indices.includes(10)).toBe(true);
        });

        [
            { input: 1, sum: 1 },
            { input: 2, sum: 1 },
            { input: 5, sum: 5 },
            { input: 6, sum: 10 },
            { input: 7, sum: 11 },
            { input: 8, sum: 23 },
            { input: 9, sum: 25 },
            { input: 10, sum: 26 },
            { input: 11, sum: 54 },
            { input: 12, sum: 57 },
            { input: 13, sum: 59 },
            { input: 14, sum: 122 },
            { input: 15, sum: 133 },
            { input: 23, sum: 806 }
        ].forEach((entry) => it(`Can calculate the adjecent sum (${entry.sum}) for "${entry.input}"`, () => {
            expect(adjecentSum(entry.input)).toBe(entry.sum);
        }));
    });
});