module.exports = { followMaze };

class Direction {
    constructor(dX, dY, knownCrossRoads = []) {
        this.dX = dX;
        this.dY = dY;

        this.knownCrossRoads = knownCrossRoads;
    }

    next(lines, x, y) {
        if (this.knownCrossRoads.some((c) => (c.x === x && c.y === y))) throw new Error(`Loop! at [${x},${y}]`);
        this.knownCrossRoads.push({ x, y });

        if (this.dX !== 0) {
            if (coordinatesInBounds(lines, x, y + 1) && !charIsEmpty(lines[x][y + 1]))
                return new Direction(0, 1, this.knownCrossRoads); //RIGHT
            if (coordinatesInBounds(lines, x, y - 1) && !charIsEmpty(lines[x][y - 1]))
                return new Direction(0, -1, this.knownCrossRoads); // LEFT
        } else if (this.dY !== 0) {
            if (coordinatesInBounds(lines, x + 1, y) && !charIsEmpty(lines[x + 1][y]))
                return new Direction(1, 0, this.knownCrossRoads); //DOWN
            if (coordinatesInBounds(lines, x - 1, y) && !charIsEmpty(lines[x - 1][y]))
                return new Direction(-1, 0, this.knownCrossRoads); //UP
        }

        return null;
    }
}

function followMaze(/**string*/ input) {
    const lines = input.split('\n');
    const characterTest = /[a-zA-Z]/;

    let chars = '';
    let x = 0, y = lines[0].indexOf('|'), direction = new Direction(1, 0);

    while (direction && coordinatesInBounds(lines, x, y)) {
        const currentChar = lines[x][y];

        if (charIsEmpty(currentChar) || '+' === currentChar) direction = direction.next(lines, x, y);
        if (characterTest.test(currentChar)) chars += currentChar;

        if (direction) {
            x += direction.dX;
            y += direction.dY;
        }
    }

    return chars;
}

function coordinatesInBounds(lines, x, y) {
    return x >= 0 && x < lines.length && y >= 0 && y < lines[x].length;
}

function charIsEmpty(char) {
    return !char || char === ' ';
}