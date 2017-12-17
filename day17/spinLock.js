module.exports = { spinLock };

function spinLock(steps, numberOfIterations = 2017, buffer = [0]) {
    let currentPosition = 0;
    let nextValue = null;

    for (let i = 0; i < numberOfIterations; i++) {
        takeStep();
        nextValue = i + 1;
        insertValue();
    }

    return {
        buffer,
        position: currentPosition
    };

    function takeStep() {
        currentPosition = (currentPosition + steps) % buffer.length;
    }

    function getNextValue() {
        return buffer[currentPosition] + 1;
    }

    function insertValue() {
        currentPosition += 1;
        buffer.splice(currentPosition, 0, nextValue);
    }
}