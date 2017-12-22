const { isOn, parseMatrix } = require('./parse');

const START_MATRIX_STRING = '.#./..#/###';

// Use an array as matrix
const START_MATRIX = parseMatrix(START_MATRIX_STRING).join().split(',');

function processArt(/**Rule[]*/ rules, numberOfIterations) {
    let out = [...START_MATRIX];

    for (let i = 0; i < numberOfIterations; i++) {
        const size = getSize(out);

        if (size % 2 !== 0 && size % 3 !== 0) continue;

        /**
         * The size of the matrix
         */
        const s = (size % 2 === 0) ? 2 : 3;

        /**
         * The number of parts it can be split in (root)
         */
        const x = (size % 2 === 0) ? size / 2 : size / 3;

        /**
         * Split the current matrix in sub matrices
         * -> rowIndex = the row of the subMatrix
         * -> colIndex = the col of the subMatrix
         * => subIndex = the index of the subMatrix (0..x**2-1)
         */
        const subMatrices = [];
        out.forEach((char, index) => {
            const rowIndex = Math.floor(index / (x * s * s));
            const colIndex = Math.floor(index % (s * x) / s);
            const subIndex = rowIndex * x + colIndex;
            if (!subMatrices[subIndex]) subMatrices[subIndex] = [];
            subMatrices[subIndex].push(char);
        });

        /**
         * Transform all subMatrices
         */
        const transformedMatrices = subMatrices.map((sub) => {
            const ruleIndex = rules.findIndex((rule) => rule.match(sub));
            return rules[ruleIndex].to;
        });

        /**
         * nS = the size of a transformed subMatrix
         */
        const nS = getSize(transformedMatrices[0]);

        /**
         * Recalculate the matrix
         * -> iIndex = index offset for the transformed subMatrix
         * -> jIndex = index if i === 0
         */
        transformedMatrices.forEach((m, i) => {
            m.forEach((char, j) => {
                const iIndex = (i % x) * nS + Math.floor(i / x) * x * nS * nS;
                const jIndex = (j % nS) + Math.floor(j / nS) * x * nS;
                const index = iIndex + jIndex;
                out[index] = char;
            });
        });
    }

    return out.reduce((acc, char) => acc + isOn(char), 0);
}

function getSize(/**string[]*/ input) {
    return Math.sqrt(input.length);
}

module.exports = { processArt };