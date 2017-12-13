const fs = require('fs');
const path = require('path');
const program = require('commander');
const { parseInput, walk, findMinimalDelay } = require('./scanner');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');
const scanner = parseInput(data);

console.log(walk(scanner).severity, findMinimalDelay(scanner));