const generator = require('../day15/generator');

describe('Day 15: Dueling Generators', () => {
    let genA;
    let genB;

    beforeEach(() => {
        genA = generator(65, generator.GENERATOR_A_FACTOR);
        genB = generator(8921, generator.GENERATOR_B_FACTOR);
    });

    it('can calculate values for generator A (start 65)', () => {
        expect(genA.next().value.valueAsNumber).toBe(1092455);
        expect(genA.next().value.valueAsNumber).toBe(1181022009);
        expect(genA.next().value.valueAsNumber).toBe(245556042);
        expect(genA.next().value.valueAsNumber).toBe(1744312007);
        expect(genA.next().value.valueAsNumber).toBe(1352636452);
    });

    it('can calculate values for generator B (start 8921)', () => {
        expect(genB.next().value.valueAsNumber).toBe(430625591);
        expect(genB.next().value.valueAsNumber).toBe(1233683848);
        expect(genB.next().value.valueAsNumber).toBe(1431495498);
        expect(genB.next().value.valueAsNumber).toBe(137874439);
        expect(genB.next().value.valueAsNumber).toBe(285222916);
    });

    it('it can get the leaase-significant 16 bits', () => {
        expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
        expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
        expect(genA.next().value.valueMod).toBe(genB.next().value.valueMod);
        expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
        expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
    });
});