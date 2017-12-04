module.exports = function manhattanDistance(/**number*/ input) {
    if (input <= 1) return 0;

    /**
     * Quadratic index: q^2 + 1 = first element of the new circle. Never an even number
     * @type {number}
     */
    let quadraticIndex = Math.floor(Math.sqrt(input));
    if (quadraticIndex % 2 === 0) quadraticIndex -= 1;

    /**
     * Circle index: the circle number around '1'. This will be the manhattan distance for all middle elements
     * @type {number}
     */
    const circleIndex = (quadraticIndex + 1) / 2;

    /**
     * Index in circle. First element (0) is the number q^2 + 1
     * @type {number}
     */
    const indexInCircle = input - (quadraticIndex ** 2) - 1;

    /**
     * We calculate from 0 'till a corner, then we start over (4 edges). The normalized index is the index in an edge
     * @type {number}
     */
    const normalizedIndex = indexInCircle % (quadraticIndex + 1);

    /**
     * The number of elements in an edge = q + 1
     * @type {number}
     */
    const deltaFromMiddle = Math.abs(normalizedIndex - (quadraticIndex - 1) / 2);

    return circleIndex + deltaFromMiddle;
};
