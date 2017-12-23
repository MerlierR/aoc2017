const DIRECTION = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
};

function turnRight(direction) {
    return (direction + 1) % 4;
}

function turnLeft(direction) {
    return (direction - 1 + 4) % 4;
}

function move([i, j], direction) {
    switch (direction) {
        case DIRECTION.LEFT:
            return [i, j - 1];
        case DIRECTION.UP:
            return [i - 1, j];
        case DIRECTION.RIGHT:
            return [i, j + 1];
        case DIRECTION.DOWN:
            return [i + 1, j];
    }
}

function burst(currentPosition, currentDirection, /**InfectionMap*/ infectionMap) {
    const isInfected = infectionMap.isInfected(currentPosition);
    const nextDirection = isInfected ? turnRight(currentDirection) : turnLeft(currentDirection);

    isInfected ? infectionMap.clean(currentPosition) : infectionMap.infect(currentPosition);

    const nextPosition = move(currentPosition, nextDirection);

    return { position: nextPosition, direction: nextDirection, infectionMap, causedInfection: !isInfected };
}

function countInfectionBursts(/**Array<number>*/ startPosition, /**InfectionMap*/ infectionMap, /**number*/ numberOfBursts) {
    let position = startPosition;
    let direction = DIRECTION.UP;
    let causedInfection = false;
    let infectionBursts = 0;

    for (let i = 0; i < numberOfBursts; i++) {
        ({ position, direction, causedInfection } = burst(position, direction, infectionMap));
        if (causedInfection) infectionBursts += 1;
    }

    return infectionBursts;
}

module.exports = { countInfectionBursts };