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

function walk(/**Layer[]*/ scanner) {
    return scanner.reduce((totalSeverity, layer, index) => {
        if (layer && layer.positionAtTick(index) === 0) {
            totalSeverity += layer.range * index;
        }

        return totalSeverity;
    }, 0);
}

module.exports = {
    Layer,
    parseInput,
    walk
};