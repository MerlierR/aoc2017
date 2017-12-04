const fs = require('fs');
const readline = require('readline');
const { checksumRow } = require('./checksum');

module.exports = (/**string*/ location) => new Promise((resolve) => {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(location)
    });

    let sum = 0;

    lineReader.on('line', (line) => {
        sum += checksumRow(line.split(/\s+/));
    });

    lineReader.on('close', () => resolve(sum));
});