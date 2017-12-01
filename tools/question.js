module.exports = async () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return await new Promise((resolve) => readline.question('Captcha to solve: ', resolve));
};