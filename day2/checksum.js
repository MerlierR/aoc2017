module.exports = {
    checksumRow, checksum
};

function checksumRow(/**number[]*/ row) {
    return Math.max(...row) - Math.min(...row);
}

function checksum(/**number[][]*/ values) {
    return values
        .map(checksumRow)
        .reduce((a, b) => a + b, 0);
}
