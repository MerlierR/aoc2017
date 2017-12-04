const program = require('commander');
const mDistance = require('./manhattanDistance');

program
    .usage('number')
    .parse(process.argv);

console.log(mDistance(program.args[0]));