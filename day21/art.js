const matrix = require('numbers').matrix;
const parseMatrix = require('./parse').parseMatrix;

const START_MATRIX_STRING = '.#./..#/###';
const START_MATRIX = parseMatrix(START_MATRIX_STRING).join().split(',');

function processArt(/**Rule[]*/ rules, numberOfIterations) {
    let out = [...START_MATRIX];

    for (let i = 0; i < numberOfIterations; i++) {
        const size = getSize(out);

        if (size % 2 !== 0 && size % 3 !== 0) continue;

        const s = (size % 2 === 0) ? 2 : 3;
        const x = (size % 2 === 0) ? size / 2 : size / 3;

        const subMatrices = [];
        out.forEach((char, index) => {
            const rowIndex = Math.floor(index / (x * s * s));
            const colIndex = Math.floor(index % (s * x) / s);
            const subIndex = rowIndex * x + colIndex;
            if (!subMatrices[subIndex]) subMatrices[subIndex] = [];
            subMatrices[subIndex].push(char);
        });

        const transformedMatrices = subMatrices.map((sub) => {
            const ruleIndex = rules.findIndex((rule) => rule.match(sub));
            if (ruleIndex === -1) throw new Error('Computer sais no');
            return rules[ruleIndex].to;
        });

        const nS = getSize(transformedMatrices[0]);
        out = [];

        transformedMatrices.forEach((m, i) => {
            m.forEach((char, j) => {
                const iIndex = (i % x) * nS + Math.floor(i / x) * x * nS * nS;
                const jIndex = (j % nS) + Math.floor(j / nS) * x * nS;
                const index = iIndex + jIndex;
                out[index] = char;
            });
        });
    }

    return out.reduce((acc, char) => acc + (char === '#' ? 1 : 0), 0);
}

function getSize(/**string[]*/ input) {
    return Math.round(Math.sqrt(input.length));
}

module.exports = { processArt };