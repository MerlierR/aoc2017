const fs = require('fs');
const path = require('path');
const program = require('commander');
const InstructionSet = require('./InstructionSet');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8').split('\n');

const instructionSet = InstructionSet.parseInput(data);
const generator = instructionSet.execute();
console.log(generator.next().value);