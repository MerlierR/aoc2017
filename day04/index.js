const path = require('path');
const { isValidFile, anagramWordValidation, sameWordValidation } = require('./passphrase');
const program = require('commander');

program
    .usage('path-to-file')
    .option('-a, --anagram', 'anagram validation')
    .parse(process.argv);

const fileName = program.args[0];
const location = path.join(process.cwd(), fileName);

(async function () {
    let operation;
    if (program.anagram) {
        operation = anagramWordValidation;
    } else {
        operation = sameWordValidation;
    }

    console.log(await isValidFile(location, operation));

    process.exit(0);
}());