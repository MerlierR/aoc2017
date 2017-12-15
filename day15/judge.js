module.exports = function judge(generatorA, generatorB, numberOfRounds) {
    let result = 0;
    let i = 0;
    let bla = 2 ** 16;
    while (i < numberOfRounds) {
        if (generatorA.next().value.valueMod === generatorB.next().value.valueMod) result++;

        i += 1;
    }

    return result;
};