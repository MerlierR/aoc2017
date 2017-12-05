const EdgeIndex = require('./EdgeIndex');
const { getQuadraticIndex, getEdgeIndex } = require('./storageDriver');

function getIndices(input) {
    const q = getQuadraticIndex(input);
    const /**EdgeIndex*/ edgeIndex = getEdgeIndex(input, q);

    const sameCircleIndices = [edgeIndex.previous(), edgeIndex.next()];
    if (edgeIndex.isFirst()) sameCircleIndices.push(edgeIndex.previous().previous());
    if (edgeIndex.isPreviousLast()) sameCircleIndices.push(edgeIndex.next().next());

    const innerCircleIndices = [];

    if (edgeIndex.isCorner() && input !== 1) {
        innerCircleIndices.push(edgeIndex.innerAdjecentCorner());
    } else if (q > 1) {
        let adjecent = edgeIndex.innerAdjecentEdge();
        innerCircleIndices.push(adjecent);

        if (!adjecent.isCorner()) {
            innerCircleIndices.push(adjecent.previous(), adjecent.next());
        } else if (adjecent.edge === edgeIndex.edge) {
            innerCircleIndices.push(adjecent.previous());
        } else {
            innerCircleIndices.push(adjecent.next());
        }
    } else {
        innerCircleIndices.push(EdgeIndex.FIRST);
    }

    return [...sameCircleIndices, ...innerCircleIndices].filter((ei) => edgeIndex.isBefore(ei));
}

const sumMap = { 1: 1 };

function adjecentSum(input) {
    if (!sumMap[input]) {
        sumMap[input] = getIndices(input)
            .map((index) => adjecentSum(index.getRealIndex()))
            .reduce((acc, val) => acc + val, 0);
    }

    return sumMap[input];
}

module.exports = { getIndices, adjecentSum };