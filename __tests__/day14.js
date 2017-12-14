const { count, createGrid, hexToBitString } = require('../day14/defragment');


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

        expect(grid[0][0]).toBe(1);
        expect(grid[0][1]).toBe(1);
        expect(grid[0][2]).toBe(0);
        expect(grid[0][3]).toBe(1);
        expect(grid[0][4]).toBe(0);
        expect(grid[0][5]).toBe(1);
        expect(grid[0][6]).toBe(0);
        expect(grid[0][7]).toBe(0);

        expect(grid[2][0]).toBe(0);
        expect(grid[2][1]).toBe(0);
        expect(grid[2][2]).toBe(0);
        expect(grid[2][3]).toBe(0);
        expect(grid[2][4]).toBe(1);
        expect(grid[2][5]).toBe(0);
        expect(grid[2][6]).toBe(1);
        expect(grid[2][7]).toBe(0);

        expect(grid[7][0]).toBe(1);
        expect(grid[7][1]).toBe(1);
        expect(grid[7][2]).toBe(0);
        expect(grid[7][3]).toBe(1);
        expect(grid[7][4]).toBe(0);
        expect(grid[7][5]).toBe(1);
        expect(grid[7][6]).toBe(1);
        expect(grid[7][7]).toBe(0);
    });

    it('can count squares', () => {
        const grid = createGrid('flqrgnkx');
        expect(count(grid)).toBe(8108);
    });
});