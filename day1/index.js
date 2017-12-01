const captcha = require('./captcha');
const program = require('commander');

(async function () {
    program
        .usage('input [options]')
        .option('-s, --step <n>', 'captcha step (default: half of the input)', parseInt)
        .parse(process.argv);

    const input = program.args[0];
    const step = program.step;

    console.log(captcha(input.toString(), step));

    process.exit(0);
}());