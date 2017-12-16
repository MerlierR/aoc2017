const fs = require('fs');
const path = require('path');
const program = require('commander');
const ProgressBar = require('progress');
const dance = require('./dance');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');

const n = 1000000000;
const bar = new ProgressBar('progress: :bar :percent | :elapseds | :etas remaining', {
    total: n,
    stream: process.stdout
});
dance.logFunction = () => bar.tick();
console.log(dance(data, n).join(''));