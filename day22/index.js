const fs = require('fs');
const path = require('path');
const program = require('commander');
const countInfectionBursts = require('./carier').countInfectionBursts;
const parseMap = require('./map').parseMap;

program.usage('path-to-rules').parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');

const { middle, map } = parseMap(data);
console.log(countInfectionBursts(middle, map, 10000));