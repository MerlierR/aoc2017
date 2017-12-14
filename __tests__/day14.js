const { count, createGrid, hexToBitString, countRegions } = require('../day14/defragment');

describe('Day 14: Defragmenting', () => {
    it('can convert hexStrings to bitStrings', () => {
        expect(hexToBitString('f')).toBe('1111');
        expect(hexToBitString('0f')).toBe('00001111');
        expect(hexToBitString('f00f')).toBe('1111000000001111');
    });

    it('can create a 128x128 matrix from an input string', () => {
        const grid = createGrid('flqrgnkx');

        expect(grid.length).toBe(128);
        grid.forEach((row) => expect(row.length).toBe(128));

        expect(grid[0][0]).toBe('#');
        expect(grid[0][1]).toBe('#');
        expect(grid[0][2]).toBe('.');
        expect(grid[0][3]).toBe('#');
        expect(grid[0][4]).toBe('.');
        expect(grid[0][5]).toBe('#');
        expect(grid[0][6]).toBe('.');
        expect(grid[0][7]).toBe('.');

        expect(grid[2][0]).toBe('.');
        expect(grid[2][1]).toBe('.');
        expect(grid[2][2]).toBe('.');
        expect(grid[2][3]).toBe('.');
        expect(grid[2][4]).toBe('#');
        expect(grid[2][5]).toBe('.');
        expect(grid[2][6]).toBe('#');
        expect(grid[2][7]).toBe('.');

        expect(grid[7][0]).toBe('#');
        expect(grid[7][1]).toBe('#');
        expect(grid[7][2]).toBe('.');
        expect(grid[7][3]).toBe('#');
        expect(grid[7][4]).toBe('.');
        expect(grid[7][5]).toBe('#');
        expect(grid[7][6]).toBe('#');
        expect(grid[7][7]).toBe('.');
    });

    it('can count squares', () => {
        const grid = createGrid('flqrgnkx');
        expect(count(grid)).toBe(8108);
    });

    describe('it can count regions', () => {
        it('for a 1x1 grid', () => {
            expect(countRegions([['#']])).toBe(1);
            expect(countRegions([['.']])).toBe(0) ;
        });

        it('for a 2x2 grid', () => {
            expect(countRegions([
                ['.','.'],
                ['.','.'],
            ])).toBe(0);

            expect(countRegions([
                ['#','.'],
                ['.','.'],
            ])).toBe(1);

            expect(countRegions([
                ['#','#'],
                ['.','.'],
            ])).toBe(1);

            expect(countRegions([
                ['#','#'],
                ['#','.'],
            ])).toBe(1);

            expect(countRegions([
                ['#','#'],
                ['#','#'],
            ])).toBe(1);

            expect(countRegions([
                ['#','.'],
                ['#','.'],
            ])).toBe(1);

            expect(countRegions([
                ['#','.'],
                ['.','#'],
            ])).toBe(2);
        });

        it('for the testgrid', () => {
            const grid = createGrid('flqrgnkx');
            expect(countRegions(grid)).toBe(1242);
        });
    });
});