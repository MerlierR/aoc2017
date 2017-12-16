module.exports = dance;

const startPositions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

function dance(/**string*/ input, positions = startPositions) {
    for (let nextMove of parseMoves(input)) {
        positions = nextMove(positions);
    }

    return positions;
}

function* parseMoves(/**string*/ input) {
    let startPosition = 0;

    while (true) {
        const nextIndex = input.indexOf(',', startPosition);
        const moveAsString = nextIndex > 0 ? input.slice(startPosition, nextIndex) : input.slice(startPosition);
        yield getMove(moveAsString);
        if (nextIndex < 0) return null;
        else startPosition = nextIndex + 1;
    }
}

function getMove(input) {
    switch (input[0]) {
        case 's':
            return (positions) => spin(positions, parseInt(input.slice(1), 10));
        case 'x':
            return (positions) => exchange(positions, ...input.slice(1).split('/').map((n) => parseInt(n, 10)));
        case 'p':
            return (positions) => partner(positions, ...input.slice(1).split('/'));
    }
}

function spin(positions, number) {
    const endPositions = positions.splice(number * -1);
    return endPositions.concat(positions);
}

function exchange(positions, aIndex, bIndex) {
    const save = positions[aIndex];
    positions[aIndex] = positions[bIndex];
    positions[bIndex] = save;

    return positions;
}

function partner(positions, a, b) {
    return exchange(positions, positions.indexOf(a), positions.indexOf(b));
}