const fs = require('fs');
const readline = require('readline');

module.exports = (/**string*/ location, /**function*/ operation) => new Promise((resolve) => {
    const lineReader = readline.createInterface({
        input: fs.createReadStream(location)
    });

    let sum = 0;

    lineReader.on('line', (line) => {
        sum += operation(line.split(/\s+/));
    });

    lineReader.on('close', () => resolve(sum));
});