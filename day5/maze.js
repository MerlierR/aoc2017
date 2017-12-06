module.exports = { solveMaze, plusOneOffsetRule, threeOrMoreOffsetRule };

function plusOneOffsetRule() {
    return 1;
}

function threeOrMoreOffsetRule(input) {
    if (input >= 3) {
        return -1;
    }

    return +1;
}

function solveMaze(/**number[]*/ puzzle, offsetRule) {
    let steps = 0;
    let index = 0;
    let maze = puzzle;

    while (!isSolved(maze, index)) {
        ({ maze, index } = jump(maze, index, offsetRule));
        steps += 1;
    }

    return steps;
}


function jump(/**number[]*/ maze, /**number*/ index, /**function*/ offsetRule) {
    const offset = maze[index];
    const newIndex = index + offset;
    maze[index] += offsetRule(offset);

    return { maze, index: newIndex };
}

function isSolved(/**number[]*/ maze, /**number*/ index) {
    return index < 0 || index >= maze.length;
}