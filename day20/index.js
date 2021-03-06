const fs = require('fs');
const path = require('path');
const program = require('commander');
const { parseInput, closestDistance, collide } = require('./particle');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');

const particles = parseInput(data);
console.log(closestDistance(particles));
console.log(collide(particles));