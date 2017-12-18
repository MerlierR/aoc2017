const fs = require('fs');
const path = require('path');
const program = require('commander');
const InstructionSet = require('./InstructionSet');

program
    .usage('path-to-file')
    .parse(process.argv);

const fileName = program.args[0];
const data = fs.readFileSync(path.join(process.cwd(), fileName), 'utf8').split('\n');

const [isA, isB] = InstructionSet.parseInput(data);

(async () => {
    const [nsA, nsB] = await Promise.all([isA.execute(), isB.execute()]);

    console.log(nsA, nsB);

    process.exit(1);
})();