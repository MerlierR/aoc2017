const SUFFIX = [17, 31, 73, 47, 23];

function parseInputAsNumberList(data) {
    return data.split(',').map((n) => parseInt(n, 10));
}

function parseInputAsCharList(data) {
    return data.split('').map((c) => c.charCodeAt());
}

function hashInput(/**number[]*/ input, /**number*/ rounds = 64, /**number*/ listSize = 256, suffix = SUFFIX) {
    let list = [...new Array(listSize).keys()];
    let skipSize = 0;
    let index = 0;

    [...new Array(rounds).keys()].forEach((roundNumber) => {
        input.concat(...suffix).forEach((length) => {
            // reverse list
            const range = [...new Array(length).keys()];
            const reversedElements = range.reduce((acc, i) => {
                const element = list[(index + i) % listSize];
                acc.push(element);
                return acc;
            }, []).reverse();

            range.forEach((i) => list[(index + i) % listSize] = reversedElements[i]);

            // update indices
            index = (index + length + skipSize) % listSize;
            skipSize += 1;
        });
    });

    const denseHash = calculateDenseHash(list);
    return {
        sparseHash: list,
        denseHash: denseHash,
        result: hashToString(denseHash)
    };
}

function calculateDenseHash(/**number[]*/ input) {
    const copy = [...input];
    const result = [];

    while (copy.length > 0) {
        const batch = copy.splice(0, 16);
        result.push(batch.reduce((acc, n) => acc ^ n, 0));
    }

    return result;
}

function hashToString(/**number[]*/ input) {
    return input.reduce((acc, num) => acc + num.toString(16).padStart(2, '0'), '');
}

module.exports = {
    hash: (/**string*/ input) => hashInput(parseInputAsCharList(input)).result,
    hashInput,
    calculateDenseHash,
    hashToString,
    parseInputAsNumberList,
    parseInputAsCharList
};