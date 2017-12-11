module.exports = { parseSteps };

class Direction {

    constructor(direction, dX, dY) {
        this.direction = direction;
        this.dX = dX;
        this.dY = dY;
    }

}

Direction.NORTH = new Direction('n', -1, 1);
Direction.NORTH_EAST = new Direction('ne', 0, 1);
Direction.SOUTH_EAST = new Direction('se', 1, 0);
Direction.SOUTH = new Direction('s', 1, -1);
Direction.SOUTH_WEST = new Direction('sw', 0, -1);
Direction.NORTH_WEST = new Direction('nw', -1, 0);
Direction.values = () => [
    Direction.NORTH,
    Direction.NORTH_EAST,
    Direction.SOUTH_EAST,
    Direction.SOUTH,
    Direction.SOUTH_WEST,
    Direction.NORTH_WEST
];
Direction.findByDirection = (direction) => Direction.values().find((d) => d.direction === direction);

class Cell {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    goTo(/**Direction*/ direction) {
        return new Cell(this.x + direction.dX, this.y + direction.dY);
    }

    distance(start = 0) {
        if (this.x === 0 && this.y === 0) return start;

        if (this.x > 0) {
            if (this.y < 0) return this.goTo(Direction.NORTH).distance(start + 1);
            else return this.goTo(Direction.NORTH_WEST).distance(start + 1);
        } else if (this.x < 0) {
            if (this.y > 0) return this.goTo(Direction.SOUTH).distance(start + 1);
            else return this.goTo(Direction.SOUTH_EAST).distance(start + 1);
        } else {
            if (this.y > 0) return this.goTo(Direction.SOUTH_WEST).distance(start + 1);
            else return this.goTo(Direction.NORTH_EAST).distance(start + 1);
        }
    }

}

function parseSteps(/**string*/ input) {
    const steps = input.split(',').map(Direction.findByDirection);
    let maxDistance = 0;

    const cell = steps.reduce((result, direction) => {
        const nextStep = result.goTo(direction);
        const nextStepDistance = nextStep.distance();
        if (nextStepDistance > maxDistance) maxDistance = nextStepDistance;
        return nextStep;
    }, new Cell(0, 0));

    return {
        cell,
        maxDistance
    };

}