class Layer {
    constructor(depth, range, thickness = 1) {
        this.depth = depth;
        this.range = range;
        this.thickness = thickness;

        /**@private*/ this.numberOfPositions = 2 + 2 * (range - 2);
        /**@private*/ this.halfNumberOfPositions = this.numberOfPositions / 2;
    }

    positionAtTick(tick) {
        const modifier = (Math.floor(tick / this.halfNumberOfPositions) % 2) * -1;

        return (tick % this.numberOfPositions) + modifier * 2 * (tick % this.halfNumberOfPositions);
    }
}

function parseInput(/**string*/ input) {
    let result = [];

    input.split('\n').forEach((line) => {
        const layer = parseLine(line);
        result[layer.depth] = layer;
    });

    return result;
}

function parseLine(/**string*/ line) {
    [depth, range] = line.split(': ');

    return new Layer(
        parseInt(depth, 10),
        parseInt(range, 10)
    );
}

function walk(/**Layer[]*/ scanner, delay = 0, fullDamage = true) {
    let index = 0;
    let length = scanner.length;
    let severity = 0;
    let caught = false;

    while ((!caught || fullDamage) && index < length) {
        const layer = scanner[index];
        if (layer && layer.positionAtTick(index + delay) === 0) {
            caught = true;
            severity += layer.range * index;
        }

        index++;
    }

    return { severity, caught };
}

function findMinimalDelay(/**Layer[]*/ scanner) {
    let delay = 0;

    while (walk(scanner, delay, false).caught) {
        delay += 1;
    }

    return delay;
}

module.exports = {
    Layer,
    parseInput,
    walk,
    findMinimalDelay
};