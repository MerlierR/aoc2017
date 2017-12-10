const { hash } = require('../day10/knotHash');

describe('Day 10', () => {
    it('can hash', () => {
        expect(hash([3, 4, 1, 5], 5)).toEqual([3, 4, 2, 1, 0]);
    });
});
