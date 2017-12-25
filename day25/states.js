/**
 Begin in state A.
 Perform a diagnostic checksum after 12134527 steps.

 In state A:
 If the current value is 0:
 - Write the value 1.
 - Move one slot to the right.
 - Continue with state B.
 If the current value is 1:
 - Write the value 0.
 - Move one slot to the left.
 - Continue with state C.

 In state B:
 If the current value is 0:
 - Write the value 1.
 - Move one slot to the left.
 - Continue with state A.
 If the current value is 1:
 - Write the value 1.
 - Move one slot to the right.
 - Continue with state C.

 In state C:
 If the current value is 0:
 - Write the value 1.
 - Move one slot to the right.
 - Continue with state A.
 If the current value is 1:
 - Write the value 0.
 - Move one slot to the left.
 - Continue with state D.

 In state D:
 If the current value is 0:
 - Write the value 1.
 - Move one slot to the left.
 - Continue with state E.
 If the current value is 1:
 - Write the value 1.
 - Move one slot to the left.
 - Continue with state C.

 In state E:
 If the current value is 0:
 - Write the value 1.
 - Move one slot to the right.
 - Continue with state F.
 If the current value is 1:
 - Write the value 1.
 - Move one slot to the right.
 - Continue with state A.

 In state F:
 If the current value is 0:
 - Write the value 1.
 - Move one slot to the right.
 - Continue with state A.
 If the current value is 1:
 - Write the value 1.
 - Move one slot to the right.
 - Continue with state E.
 */

function parseState(lines) {
    const if0Write = parseInt(lines[2].match(/(\d)/)[1], 10);
    const if0Move = lines[3].match(/(left|right)/)[1] === 'right' ? 1 : -1;
    const if0Goto = lines[4].match(/.+?(.)\./)[1];

    const if1Write = parseInt(lines[4 + 2].match(/(\d)/)[1], 10);
    const if1Move = lines[4 + 3].match(/(left|right)/)[1] === 'right' ? 1 : -1;
    const if1Goto = lines[4 + 4].match(/.+?(.)\./)[1];

    return (tape, currentIndex) => {
        const value = tape.get(currentIndex) || 0;
        let nextIndex;
        let nextState;

        if (value === 0) {
            tape.set(currentIndex, if0Write);
            nextIndex = if0Move;
            nextState = if0Goto;
        } else {
            tape.set(currentIndex, if1Write);
            nextIndex = if1Move;
            nextState = if1Goto;
        }

        return { index: currentIndex + nextIndex, state: nextState };
    };
}


module.exports = function parseStates(data) {
    const lines = data.split('\n\n');
    const startValues = lines.splice(0, 1)[0].split('\n');

    const start = startValues[0].match(/.+state (.)\./)[1];
    const numberOfIterations = parseInt(startValues[1].match(/(\d+)/)[1], 10);

    const states = lines.reduce((/**Map*/ acc, stateDefinition) => {
        const stateLines = stateDefinition.split('\n');
        const stateName = stateLines[0].match(/.+(.):/)[1];

        acc.set(stateName, parseState(stateLines));

        return acc;
    }, new Map());

    return { start, numberOfIterations, states };
};