const generator = require('../day15/generator');

describe('Day 15: Dueling Generators', () => {
    let genA;
    let genB;

    describe('Part 1, noe multiples required', () => {

        beforeEach(() => {
            genA = generator(65, generator.GENERATOR_A_FACTOR, 1);
            genB = generator(8921, generator.GENERATOR_B_FACTOR, 1);
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

    describe('Part 2: with multiples', () => {
        beforeEach(() => {
            genA = generator(65, generator.GENERATOR_A_FACTOR, generator.GENERATOR_A_MULTIPLE);
            genB = generator(8921, generator.GENERATOR_B_FACTOR, generator.GENERATOR_B_MULTIPLE);
        });

        it('can calculate values for generator A (start 65)', () => {
            expect(genA.next().value.valueAsNumber).toBe(1352636452);
            expect(genA.next().value.valueAsNumber).toBe(1992081072);
            expect(genA.next().value.valueAsNumber).toBe(530830436);
            expect(genA.next().value.valueAsNumber).toBe(1980017072);
            expect(genA.next().value.valueAsNumber).toBe(740335192);
        });

        it('can calculate values for generator B (start 8921)', () => {
            expect(genB.next().value.valueAsNumber).toBe(1233683848);
            expect(genB.next().value.valueAsNumber).toBe(862516352);
            expect(genB.next().value.valueAsNumber).toBe(1159784568);
            expect(genB.next().value.valueAsNumber).toBe(1616057672);
            expect(genB.next().value.valueAsNumber).toBe(412269392);
        });

        it('it can get the leaase-significant 16 bits', () => {
            expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
            expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
            expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
            expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
            expect(genA.next().value.valueMod).not.toBe(genB.next().value.valueMod);
        });
    });
});