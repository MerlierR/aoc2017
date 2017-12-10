const fs = require('fs');
const path = require('path');
const program = require('commander');
const { hash } = require('./knotHash');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8').split(',').map((n) => parseInt(n, 10));

const resultHash = hash(data);
console.log(resultHash[0] * resultHash[1]);