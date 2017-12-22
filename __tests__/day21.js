const { Rule, parseMatrix, parseRule } = require('../day21/parse');
const { processArt } = require('../day21/art');

describe('Day 21: Fractal Art', () => {
    describe('Rule', () => {
        it('can match multiple variations', () => {
            const from = parseMatrix('##/..');
            const rule = new Rule(from, []);

            expect(rule.match(parseMatrix('##/..'))).toBe(true);
            expect(rule.match(parseMatrix('../##'))).toBe(true);
            expect(rule.match(parseMatrix('#./#.'))).toBe(true);
            expect(rule.match(parseMatrix('.#/.#'))).toBe(true);

            expect(rule.match(parseMatrix('../..'))).toBe(false);
            expect(rule.match(parseMatrix('##/##'))).toBe(false);
            expect(rule.match(parseMatrix('#./.#'))).toBe(false);
        });
    });

    describe('Art processing', () => {
        let rules;
        beforeEach(() => {
            rules = [
                parseRule('../.# => ##./#../...'),
                parseRule('.#./..#/### => #..#/..../..../#..#')
            ];
        });

        it('has the correct rules', () => {
            expect(rules.length).toBe(2);

            expect(rules[0].match(parseMatrix('../.#'))).toBe(true);
            expect(rules[0].match(parseMatrix('../..'))).toBe(false);

            expect(rules[1].match(parseMatrix('.#./..#/###'))).toBe(true);
            expect(rules[1].match(parseMatrix('.#./.##/###'))).toBe(false);
        });

        it('can count pixels after N iterations', () => {
            expect(processArt(rules, 0)).toBe(5);
            expect(processArt(rules, 2)).toBe(12);
        });
    });
});