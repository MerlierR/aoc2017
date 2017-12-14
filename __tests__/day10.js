const { hash, hashInput, parseInputAsCharList, parseInputAsNumberList, calculateDenseHash, hashToString } = require('../day10/knotHash');

describe('Day 10', () => {
    it('can hash', () => {
        expect(hashInput([3, 4, 1, 5], 1, 5, []).sparseHash).toEqual([3, 4, 2, 1, 0]);
    });

    it('can parse the input as a number list', () => {
        expect(parseInputAsNumberList('1,2,3')).toEqual([1, 2, 3]);
    });

    it('can parse the input as a char list', () => {
        expect(parseInputAsCharList('1,2,3')).toEqual([49, 44, 50, 44, 51]);
    });

    it('can calculate dense hashes', () => {
        expect(calculateDenseHash([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22])).toEqual([64]);
        expect(calculateDenseHash([
            65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22,
            65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22
        ])).toEqual([64, 64]);
    });

    it('can convert a hash to string', () => {
        expect(hashToString([64, 7, 255])).toBe('4007ff');
    });

    [
        { input: '', expectedResult: 'a2582a3a0e66e6e86e3812dcb672a272' },
        { input: 'AoC 2017', expectedResult: '33efeb34ea91902bb2f59c9920caa6cd' },
        { input: '1,2,3', expectedResult: '3efbe78a8d82f29979031a4aa0b16a9d' },
        { input: '1,2,4', expectedResult: '63960835bcdc130f0b66d7ff4f6a5a8e' }
    ].forEach((entry) => it(`Can calculate the hash (${entry.expectedResult}) for "${entry.input}"`, () => {
        expect(hashInput(parseInputAsCharList(entry.input)).result).toBe(entry.expectedResult);
        expect(hash(entry.input)).toBe(entry.expectedResult);
    }));
});
