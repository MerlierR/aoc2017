const captcha = require('./captcha');
const question = require('../tools/question');

(async function () {
    const input = process.argv.slice(2)[0] || await question('Captcha to solve: ');

    console.log(`Solving captcha for "${input}"`);
    console.log(`Result is "${captcha(input)}"`);

    process.exit(0);
}());