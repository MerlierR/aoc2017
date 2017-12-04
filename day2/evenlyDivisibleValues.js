module.exports = {
    evenlyDivisibleValues,
    evenlyDivisibleValuesRow
};

function evenlyDivisibleValues(/**number[][]*/ values) {
    return values
        .map(evenlyDivisibleValuesRow)
        .reduce((a, b) => a + b, 0);
}

function evenlyDivisibleValuesRow(/**number[]*/ row) {
    let result;

    let i = 0;
    while (i < row.length && !result) {
        let j = i + 1;

        while (j < row.length && !result) {
            const first = row[i];
            const second = row[j];

            if (first % second === 0) {
                result = first / second;
            } else if (second % first === 0) {
                result = second / first;
            }

            j += 1;
        }

        i += 1;
    }

    return result || 0;
}