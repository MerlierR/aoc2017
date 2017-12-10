const fs = require('fs');
const path = require('path');
const program = require('commander');
const { hash, parseInputAsNumberList, parseInputAsCharList, SUFFIX } = require('./knotHash');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');
const input = parseInputAsCharList(data);
const resultHash = hash(input, program.rounds);

console.log(resultHash.result);