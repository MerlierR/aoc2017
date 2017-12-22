const fs = require('fs');
const path = require('path');
const program = require('commander');
const processArt = require('./art').processArt;
const parseRules = require('./parse').parseRules;

program.usage('path-to-rules').parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8');

const rules = parseRules(data);
console.log(processArt(rules, 18));