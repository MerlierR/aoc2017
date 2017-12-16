module.exports = dance;
let i, j, save;

const startPositions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

function dance(/**string*/ input, numberOfIterations = 1, positions = [...startPositions]) {
    const tableLength = positions.length;
    const helpingTable = new Array(tableLength);

    const moves = [];
    for (let nextMove of parseMoves(input, tableLength, helpingTable)) moves.push(nextMove);

    let i;
    for (i = 0; i < numberOfIterations; i += 1) {
        if (dance.logFunction) dance.logFunction(i);
        moves.forEach((move) => move(positions));
    }

    return positions;
}

dance.logFunction = () => {};

function* parseMoves(/**string*/ input, tableLength, helpingTable) {
    let startPosition = 0;

    while (true) {
        const nextIndex = input.indexOf(',', startPosition);
        const moveAsString = nextIndex > 0 ? input.slice(startPosition, nextIndex) : input.slice(startPosition);
        yield getMove(moveAsString, tableLength, helpingTable);
        if (nextIndex < 0) return null;
        else startPosition = nextIndex + 1;
    }
}

function getMove(input, tableLength, helpingTable) {
    switch (input[0]) {
        case 's':
            return (positions) => spin(positions, parseInt(input.slice(1), 10), tableLength, helpingTable);
        case 'x':
            return (positions) => exchange(positions, ...input.slice(1).split('/').map((n) => parseInt(n, 10)));
        case 'p':
            return (positions) => partner(positions, ...input.slice(1).split('/'));
    }
}

function spin(positions, number, tableLength, helpingTable) {
    for (j = number - 1, i = tableLength - 1; i >= tableLength - number; i -= 1, j -= 1) {
        helpingTable[j] = positions[i];
    }

    for (i = tableLength - 1; i >= number; i -= 1) {
        positions[i] = positions[i - number];
    }

    for (i = 0; i < number; i += 1) {
        positions[i] = helpingTable[i];
    }
}

function exchange(positions, aIndex, bIndex) {
    save = positions[aIndex];
    positions[aIndex] = positions[bIndex];
    positions[bIndex] = save;
}

function partner(positions, a, b) {
    return exchange(positions, positions.indexOf(a), positions.indexOf(b));
}