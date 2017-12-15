const { getEdgeIndex, getCircleIndex, getQuadraticIndex } = require('./storageDriver');

module.exports = function manhattanDistance(/**number*/ input) {
    if (input <= 1) return 0;

    const quadraticIndex = getQuadraticIndex(input);
    const circleIndex = getCircleIndex(quadraticIndex);
    const indexInEdge = getEdgeIndex(input, quadraticIndex).index;

    /**
     * The number of elements in an edge = q + 1
     * @type {number}
     */
    const deltaFromMiddle = Math.abs(indexInEdge - (quadraticIndex - 1) / 2);

    return circleIndex + deltaFromMiddle;
};

