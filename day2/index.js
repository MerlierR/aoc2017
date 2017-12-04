const path = require('path');
const fileChecksum = require('./fileChecksum');
const program = require('commander');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];

(async function () {
    console.log(await fileChecksum(path.join(process.cwd(), fileName)));
    process.exit(0);
}());
