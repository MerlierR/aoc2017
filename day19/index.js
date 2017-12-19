const fs = require('fs');
const path = require('path');
const program = require('commander');
const { followMaze } = require('./maze');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');

console.log(followMaze(data));