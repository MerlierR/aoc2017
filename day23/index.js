const fs = require('fs');
const path = require('path');
const program = require('commander');
const InstructionSet = require('./InstructionSet');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8').split('\n');

const is = InstructionSet.parseInput(data);
is.debug = false;
console.log(is.execute());
require('./program');