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

function reverse(direction) {
    return (direction + 2) % 4;
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

function countInfectionBursts(/**Array<number>*/ startPosition,
                              /**InfectionMap*/ infectionMap,
                              /**number*/ numberOfBursts,
                              /**function*/ burstFn = burst) {
    let position = startPosition;
    let direction = DIRECTION.UP;
    let causedInfection = false;
    let infectionBursts = 0;

    for (let i = 0; i < numberOfBursts; i++) {
        ({ position, direction, causedInfection } = burstFn(position, direction, infectionMap));
        if (causedInfection) infectionBursts += 1;
    }

    return infectionBursts;
}

function enhancedBurst(currentPosition, currentDirection, /**InfectionMap*/ infectionMap) {
    // Check state
    const isWeakened = infectionMap.isWeakened(currentPosition);
    const isInfected = infectionMap.isInfected(currentPosition);
    const isFlagged = infectionMap.isFlagged(currentPosition);
    const isClean = !(isWeakened || isInfected || isFlagged);

    // Next direction decision
    let nextDirection;
    if (isClean) nextDirection = turnLeft(currentDirection);
    else if (isWeakened) nextDirection = currentDirection;
    else if (isInfected) nextDirection = turnRight(currentDirection);
    else if (isFlagged) nextDirection = reverse(currentDirection);

    // Modify the node
    if (isClean) infectionMap.weaken(currentPosition);
    else if (isWeakened) infectionMap.infect(currentPosition);
    else if (isInfected) infectionMap.flag(currentPosition);
    else if (isFlagged) infectionMap.clean(currentPosition);

    // Move to the next position
    const nextPosition = move(currentPosition, nextDirection);

    return { position: nextPosition, direction: nextDirection, infectionMap, causedInfection: isWeakened };
}

module.exports = { countInfectionBursts, enhancedBurst };