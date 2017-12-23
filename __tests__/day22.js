const parseMap = require('../day22/map').parseMap;
const countInfectionBursts = require('../day22/carier').countInfectionBursts;
const enhancedBurst = require('../day22/carier').enhancedBurst;

const TEST_MAP = `
..#
#..
...
`.trim();

describe('Day 22: Sporifica Virus', () => {

    it('can parse a map', () => {
        const { map, middle } = parseMap(TEST_MAP);

        expect(middle).toEqual([1, 1]);

        expect(map.isInfected([0, 0])).toBe(false);
        expect(map.isInfected([0, 1])).toBe(false);
        expect(map.isInfected([0, 2])).toBe(true);

        expect(map.isInfected([1, 0])).toBe(true);
        expect(map.isInfected([1, 1])).toBe(false);
        expect(map.isInfected([1, 2])).toBe(false);

        expect(map.isInfected([2, 0])).toBe(false);
        expect(map.isInfected([2, 1])).toBe(false);
        expect(map.isInfected([2, 2])).toBe(false);

        expect(map.isInfected([-5, 17])).toBe(false);
    });

    it('can count infection bursts after 70 bursts', () => {
        const { map, middle } = parseMap(TEST_MAP);
        expect(countInfectionBursts(middle, map, 70)).toBe(42);
    });

    it('can count infection bursts after 10000 bursts', () => {
        const { map, middle } = parseMap(TEST_MAP);
        expect(countInfectionBursts(middle, map, 10000)).toBe(5587);
    });

    it('can count the infecting enhanced burtst after 100 bursts', () => {
        const { map, middle } = parseMap(TEST_MAP);
        expect(countInfectionBursts(middle, map, 100, enhancedBurst)).toBe(26);
    });

    it('can count the infecting enhanced burtst after 10000000 bursts', () => {
        const { map, middle } = parseMap(TEST_MAP);
        expect(countInfectionBursts(middle, map, 10000000, enhancedBurst)).toBe(2511944);
    });
});