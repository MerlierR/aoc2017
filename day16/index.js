const fs = require('fs');
const path = require('path');
const program = require('commander');
const dance = require('./dance');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');

console.log(dance(data, 1000000000));