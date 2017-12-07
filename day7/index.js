const fs = require('fs');
const path = require('path');
const program = require('commander');

const Tower = require('./tower');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const towerConfig = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8').split('\n');
const tower = Tower.fromConfig(towerConfig);

console.log(tower.name);