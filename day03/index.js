const program = require('commander');
const mDistance = require('./manhattanDistance');
const aSum = require('./adjecentSum').adjecentSum;

program
    .usage('number')
    .option('-1, --first', 'calculate the distance (default)')
    .option('-2, --second', 'print the adjecent numbers untill max is reached')
    .parse(process.argv);

if (program.second) {
    const max = program.args[0];
    let i = 0;
    let r = 0;

    while (r < max) {
        i += 1;
        r = aSum(i);
        console.log(`${i}\t: ${r}`);
    }

} else {
    console.log(mDistance(program.args[0]));
}