const fs = require('fs');
const path = require('path');
const program = require('commander');

const Memory = require('./memory');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const memoryConfig = fs
    .readFileSync(path.join(process.cwd(), fileName), 'utf8')
    .split(/\s+/)
    .map((input) => parseInt(input, 10));

const memory = new Memory(memoryConfig);
console.log(memory.reallocate(), memory.getCyclesInInfiniteLoopAfterReallocation());