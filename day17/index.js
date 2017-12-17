const program = require('commander');
const { spinLock } = require('./spinLock');
const DEFAULT_INPUT = 355;

program
    .option('-i, --input <n>', `day 17 input (defaults to ${DEFAULT_INPUT})`, parseInt)
    .parse(process.argv);

const input = program.input || DEFAULT_INPUT;

const { buffer, position } = spinLock(input);

console.log(buffer[position], buffer[(position + 1) % buffer.length]);