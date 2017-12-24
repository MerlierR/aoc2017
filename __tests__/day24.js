const { maxBridgeStrength, longestBridge, parseInput } = require('../day24/bridges');

describe('Day 24: Electromagnetic Moat', () => {
    let input;

    beforeEach(() => {
        input = parseInput(`
0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`.trim());
    });

    it('can calculate the max bridge strength', () => {
        expect(maxBridgeStrength(input)).toBe(31);
    });

    it('can calculate the weight of the strongest bridge', () => {
        expect(longestBridge(input)).toEqual({ length: 4, strength: 19 });
    });
});