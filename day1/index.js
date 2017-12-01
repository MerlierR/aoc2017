const captcha = require('./captcha');
const program = require('commander');

program
    .usage('input [options]')
    .option('-s, --step <n>', 'captcha step (default: half of the input)', parseInt)
    .parse(process.argv);

const input = program.args[0];
const step = program.step;

console.log(captcha(input, step));
