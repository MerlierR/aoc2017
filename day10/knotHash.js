function hash(/**number[]*/ input, /**number*/ listSize = 256) {
    let list = [...new Array(listSize).keys()];
    let skipSize = 0;
    let index = 0;

    input.forEach((length) => {
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

    return list;
}

module.exports = { hash };