const matrix = require('numbers').matrix;

class Rule {
    constructor(from, to) {
        const rRow = matrix.reverseRows(from);
        const rCol = matrix.reverseCols(from);
        const rRowCol = matrix.reverseCols(rRow);

        this.matchers = [
            from.join(), matrix.transpose(from).join(),
            rRow.join(), matrix.transpose(rRow).join(),
            rCol.join(), matrix.transpose(rCol).join(),
            rRowCol.join(), matrix.transpose(rRowCol).join()
        ];

        this.to = to.join().split(',');
    }

    match(input) {
        return this.matchers.some((matcher) => this.mMatch(matcher, input));
    }

    mMatch(matcher, matrixAsList) {
        return matcher === matrixAsList.join();
    }
}

function parseRules(/**string*/ data) {
    return data.split('\n').map(parseRule);
}

function parseRule(/**string*/ line) {
    const [from, to] = line.split(' => ');

    return new Rule(parseMatrix(from), parseMatrix(to));
}

function parseMatrix(/**string*/ matrix) {
    return matrix.split('/').map(parseArray);
}

function parseArray(/**string*/ row) {
    return row.trim().split('').map(parseChar);
}

function parseChar(/**string*/ char) {
    return char;
}

function isOn(char) {
    return char === '#' ? 1 : 0;
}

module.exports = {
    Rule,
    parseRules,
    parseRule,
    parseMatrix,
    parseArray,
    parseChar,
    isOn
};
