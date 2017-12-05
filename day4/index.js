const path = require('path');
const { isValidFile } = require('./passphrase');
const program = require('commander');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const location = path.join(process.cwd(), fileName);

(async function () {
    console.log(await isValidFile(location));

    process.exit(0);
}());