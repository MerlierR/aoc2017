const path = require('path');
const fileOperation = require('./fileOperation');
const program = require('commander');

program
    .usage('path-to-file')
    .option('-c, --checksum', 'checksum calculation')
    .option('-e, --evenly-divisible-values', 'evenly divisible values calculation (default)')
    .parse(process.argv);

const fileName = program.args[0];
let opration;
if(program.checksum) {
    operation = require('./checksum').checksumRow;
} else {
    operation = require('./evenlyDivisibleValues').evenlyDivisibleValuesRow
}

(async function () {
    const location = path.join(process.cwd(), fileName);
    console.log(await fileOperation(location, operation));
    process.exit(0);
}());
