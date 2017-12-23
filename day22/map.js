class InfectionMap {
    constructor(/**Set<Array>*/ infections) {
        this.infections = infections;
        this.weakened = new Set();
        this.flagged = new Set();
    }

    isInfected(position) {
        return this.infections.has(position.join());
    }

    isWeakened(position) {
        return this.weakened.has(position.join());
    }

    isFlagged(position) {
        return this.flagged.has(position.join());
    }

    clean(position) {
        this.infections.delete(position.join());
        this.weakened.delete(position.join());
        this.flagged.delete(position.join());
    }

    infect(position) {
        this.weakened.delete(position.join());
        this.flagged.delete(position.join());
        this.infections.add(position.join());
    }

    weaken(position) {
        this.infections.delete(position.join());
        this.flagged.delete(position.join());
        this.weakened.add(position.join());
    }

    flag(position) {
        this.weakened.delete(position.join());
        this.infections.delete(position.join());
        this.flagged.add(position.join());
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