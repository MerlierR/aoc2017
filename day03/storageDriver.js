const EdgeIndex = require('./EdgeIndex');

module.exports = {
    getQuadraticIndex,
    getEdgeIndex,
    getCircleIndex
};

/**
 * @description q^2 + 1 = first element of the new circle. Never an even number
 * @param input
 * @returns {number}
 */
function getQuadraticIndex(/**number*/ input) {
    let quadraticIndex = Math.floor(Math.sqrt(input - 1));
    if (quadraticIndex % 2 === 0) quadraticIndex -= 1;

    return quadraticIndex;
}

/**
 * @description the circle number around '1'. This will be the manhattan distance for all middle elements
 * @param quadraticIndex
 * @returns {number}
 */
function getCircleIndex(/**number*/ quadraticIndex = getQuadraticIndex(input)) {
    return (quadraticIndex + 1) / 2;
}

/**
 * @description the edge number and the index of the element in that edge.
 *              if the index equals the quadratic index, the input is a corner element
 * @param input
 * @param quadraticIndex
 * @returns EdgeIndex
 */
function getEdgeIndex(/**number*/ input, /**number*/ quadraticIndex = getQuadraticIndex(input)) {
    if(quadraticIndex === -1) return EdgeIndex.FIRST;

    /**
     * Index in circle. First element (0) is the number q^2 + 1
     * @type {number}
     */
    const indexInCircle = input - (quadraticIndex ** 2) - 1;

    /**
     * We calculate from 0 'till a corner, then we start over (4 edges). The normalized index is the index in an edge
     * @type {number}
     */
    const index = indexInCircle % (quadraticIndex + 1);
    const edge = Math.floor(indexInCircle / (quadraticIndex + 1));

    return new EdgeIndex(edge, index, quadraticIndex);
}