module.exports = { spinLock, spinLockAtPosition1 };

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

    function insertValue() {
        currentPosition += 1;
        buffer.splice(currentPosition, 0, nextValue);
    }
}

function spinLockAtPosition1(steps, numberOfIterations = 50000000) {
    let currentPosition = 0;
    let valueAtPosition = null;

    for (let i = 0; i < numberOfIterations; i++) {
        takeStep(i + 1);
        if (willBeInsertedAtPosition1()) {
            valueAtPosition = i + 1;
        }
    }

    return valueAtPosition;

    function takeStep(bufferLength) {
        currentPosition = (currentPosition + steps + 1) % bufferLength;
    }

    function willBeInsertedAtPosition1() {
        return currentPosition === 0;
    }
}