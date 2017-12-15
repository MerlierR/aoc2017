const BIT_16 = 2 ** 16;

function* generator(startValue, factor, multiple, divider = 2147483647) {
    let previousValue = startValue;

    while (true) {
        previousValue = (previousValue * factor) % divider;

        while (previousValue % multiple !== 0) {
            previousValue = (previousValue * factor) % divider;
        }

        yield {
            valueAsNumber: previousValue,
            valueMod: previousValue % BIT_16
        };
    }
}

generator.GENERATOR_A_FACTOR = 16807;
generator.GENERATOR_A_MULTIPLE = 4;
generator.GENERATOR_B_FACTOR = 48271;
generator.GENERATOR_B_MULTIPLE = 8;

module.exports = generator;
module.exports.generatorA = generator(873, generator.GENERATOR_A_FACTOR, generator.GENERATOR_A_MULTIPLE);
module.exports.generatorB = generator(583, generator.GENERATOR_B_FACTOR, generator.GENERATOR_B_MULTIPLE);