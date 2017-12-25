const parseStates = require('./states');

module.exports = function checksum(data) {
    const { start, numberOfIterations, states } = parseStates(data);

    let tape = new Map();
    let state = start;
    let index = 0;
    for (let i = 0; i < numberOfIterations; i++) {
        ({ index, state } = states.get(state)(tape, index));
    }

    let result = 0;
    tape.forEach((val) => result += val);

    return result;
};