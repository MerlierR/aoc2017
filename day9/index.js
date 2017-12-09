const fs = require('fs');
const path = require('path');
const program = require('commander');
const Stream = require('./stream');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');

const stream = Stream.parse(data)[0];
console.log(stream.getTotalScore());