const fs = require('fs');
const path = require('path');
const program = require('commander');
const { parseInput } = require('./plumber');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');
const nodeList = parseInput(data);

console.log(nodeList.countConnectionsTo(0), nodeList.countGroups());