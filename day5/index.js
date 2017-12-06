const fs = require('fs');
const path = require('path');
const program = require('commander');

const { solveMaze, plusOneOffsetRule, threeOrMoreOffsetRule } = require('./maze');

program
    .usage('path-to-file')
    .option('-r, --rule3', 'use the >=3 offset rule')
    .parse(process.argv);

const fileName = program.args[0];
const maze = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8').split('\n').map((input) => parseInt(input, 10));
const rule = program.rule3 ? threeOrMoreOffsetRule : plusOneOffsetRule;

console.log(solveMaze(maze, rule));