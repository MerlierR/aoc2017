const fs = require('fs');
const readline = require('readline');

module.exports = { isValid, isValidFile, sameWordValidation, anagramWordValidation };

async function isValidFile(/**string*/ location, /**function*/ isValidWord = sameWordValidation) {
    return new Promise((resolve) => {
        const lineReader = readline.createInterface({
            input: fs.createReadStream(location)
        });

        let numberOfValidPhrases = 0;
        let numberOfPhrases = 0;

        lineReader.on('line', (line) => {
            numberOfPhrases += 1;
            if (isValid(line, isValidWord)) numberOfValidPhrases += 1;
        });

        lineReader.on('close', () => resolve({ numberOfValidPhrases, numberOfPhrases }));
    });
}

function isValid(passPhrase, /**function*/ isValidWord = sameWordValidation) {
    const words = passPhrase.split(/\s+/);

    let isValid = true;
    let currentWord;
    let restWords = words;
    while (isValid && restWords.length > 0) {
        currentWord = restWords[0];
        restWords = restWords.splice(1);

        isValid = isValid && isValidWord(currentWord, restWords);
    }

    return isValid;
}

function sameWordValidation(currentWord, restWords) {
    return !restWords.includes(currentWord);
}

function anagramWordValidation(currentWord, restWords) {
    const currentSorted = alpha(currentWord);

    return !restWords.some((word) => alpha(word) === currentSorted);

    function alpha(word) {
        return word.split('').sort().reduce((a, b) => a + b, '');
    }
}