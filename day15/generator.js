const BIT_16 = 2 ** 16;

function* generator(startValue, factor, divider = 2147483647) {
    let previousValue = startValue;

    while (true) {
        previousValue = (previousValue * factor) % divider;

        yield {
            valueAsNumber: previousValue,
            valueMod: previousValue % BIT_16
        };
    }
}

generator.GENERATOR_A_FACTOR = 16807;
generator.GENERATOR_B_FACTOR = 48271;

module.exports = generator;
module.exports.generatorA = generator(873, generator.GENERATOR_A_FACTOR);
module.exports.generatorB = generator(583, generator.GENERATOR_B_FACTOR);