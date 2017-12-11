const fs = require('fs');
const path = require('path');
const program = require('commander');
const { parseSteps } = require('./hexGrid');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');
const { cell, maxDistance } = parseSteps(data);

console.log(cell.distance(), maxDistance);