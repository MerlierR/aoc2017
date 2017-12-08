function parseInstructionSet(data) {
    const lines = data.split('\n');
    const rules = lines.map(parseRule);

    const vars = {};
    rules.forEach(({ name, operation, condition }) => {
        if (!vars[name]) vars[name] = 0;
        if (condition(vars)) {
            vars[name] = operation(vars[name]);
        }
    });

    return vars;
}

function parseRule(line) {
    const [operationString, clauseString] = line.split(' if ');
    const [name, operation, operand] = operationString.split(' ');

    return {
        name,
        operation: parseOperation(operation, operand),
        condition: parseClause(clauseString)
    };

    function parseOperation(operation, operand) {
        return (input) => {
            if (operation === 'inc') {
                return input + parseInt(operand, 10);
            } else {
                return input - parseInt(operand, 10);
            }
        };
    }

    function parseClause(clauseString) {
        const [varName, operation, argument] = clauseString.split(' ');

        return (vars) => {
            const variable = vars[varName] || 0;
            return eval(`${variable} ${operation} ${argument}`);
        };
    }
}

function findLargestVal(vars) {
    return Math.max(...Object.values(vars));
}

module.exports = { parseInstructionSet, findLargestVal };