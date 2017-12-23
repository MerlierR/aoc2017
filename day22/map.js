class InfectionMap {
    constructor(/**Set<Array>*/ infections) {
        this.infections = infections;
    }

    isInfected(position) {
        return this.infections.has(position.join());
    }

    clean(position) {
        this.infections.delete(position.join());
    }

    infect(position) {
        this.infections.add(position.join());
    }
}

function parseMap(input) {
    const infections = new Set();
    const columns = input.split('\n');

    columns.forEach((line, i) => {
        line.split('').forEach((char, j) => {
            if (char === '#') {
                infections.add([i, j].join());
            }
        });
    });

    return {
        map: new InfectionMap(infections),
        middle: [
            (columns.length - 1) / 2,
            (columns[0].length - 1) / 2
        ]
    };
}

module.exports = { parseMap, InfectedMap: InfectionMap };