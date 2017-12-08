const fs = require('fs');
const path = require('path');
const program = require('commander');
const { parseInstructionSet, findLargestVal, getLargestValDuringProcess } = require('./register');
program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');

const vars = parseInstructionSet(data);
console.log(findLargestVal(vars), getLargestValDuringProcess());