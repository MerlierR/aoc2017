const fs = require('fs');
const readline = require('readline');

module.exports = { isValid, isValidFile };

async function isValidFile(/**string*/ location) {
    return new Promise((resolve) => {
        const lineReader = readline.createInterface({
            input: fs.createReadStream(location)
        });

        let numberOfValidPhrases = 0;
        let numberOfPhrases = 0;

        lineReader.on('line', (line) => {
            numberOfPhrases += 1;
            if (isValid(line)) numberOfValidPhrases += 1;
        });

        lineReader.on('close', () => resolve({ numberOfValidPhrases, numberOfPhrases }));
    });
}

function isValid(passPhrase) {
    const words = passPhrase.split(/\s+/);

    let isValid = true;
    let currentWord;
    let restWords = words;
    while (isValid && restWords.length > 0) {
        currentWord = restWords[0];
        restWords = restWords.splice(1);

        isValid = isValid && !restWords.includes(currentWord);
    }

    return isValid;
}