module.exports = dance;
let i, j, save;

const startPositions = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];

function dance(/**string*/ input, numberOfIterations = 1, positions = [...startPositions]) {
    const tableLength = positions.length;
    const helpingTable = new Array(tableLength);
    const moves = getMoves(input, tableLength, helpingTable);

    const { cycle, offset, offsets } = findCycle();

    if (numberOfIterations < offset) return offsets[i];
    else return cycle[(numberOfIterations - offset) % cycle.length];

    function findCycle() {
        const remember = [positions.join('')];
        let hasCycle = false;
        let currentHash;

        while (!hasCycle) {
            moves.forEach((move) => move(positions));
            currentHash = positions.join('');

            if (remember.includes(currentHash)) {
                hasCycle = true;
            } else {
                remember.push(currentHash);
            }
        }

        const offset = remember.indexOf(currentHash);
        const cycle = remember.splice(offset);

        return { cycle, offset, offsets: remember };
    }
}

function getMoves(input, tableLength, helpingTable) {
    const moves = [];
    for (let nextMove of parseMoves(input, tableLength, helpingTable)) moves.push(nextMove);

    return moves;
}

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
            const argsx = input.slice(1).split('/').map((n) => parseInt(n, 10));
            return (positions) => exchange(positions, ...argsx);
        case 'p':
            let argsp = input.slice(1).split('/');
            return (positions) => partner(positions, ...argsp);
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