const fs = require('fs');
const path = require('path');
const { isValid, isValidFile, anagramWordValidation } = require('../day04/passphrase');

describe('Day 4: Passphrases', () => {
    describe('Part 1', () => {
        [
            { phrase: 'aa bb cc dd ee', valid: true },
            { phrase: 'aa bb cc dd aa', valid: false },
            { phrase: 'aa bb cc dd aaa', valid: true }
        ].forEach((entry) => it(`Can check the validity (${entry.valid}) of "${entry.phrase}"`, () => {
            expect(isValid(entry.phrase)).toBe(entry.valid);
        }));

        it('Can check the validity of a file', async () => {
            const filePath = path.join(__dirname, 'day04.passphrases.txt');
            expect(fs.existsSync(filePath)).toBe(true);

            const result = await isValidFile(filePath);
            expect(result.numberOfPhrases).toBe(3);
            expect(result.numberOfValidPhrases).toBe(2);
        });
    });

    describe('Part 2', () => {
        [
            { phrase: 'abcde fghij', valid: true },
            { phrase: 'abcde xyz ecdab', valid: false },
            { phrase: 'a ab abc abd abf abj', valid: true },
            { phrase: 'iiii oiii ooii oooi oooo', valid: true },
            { phrase: 'oiii ioii iioi iiio', valid: false }
        ].forEach((entry) => it(`Can check the anagram validity (${entry.valid}) of "${entry.phrase}"`, () => {
            expect(isValid(entry.phrase, anagramWordValidation)).toBe(entry.valid);
        }));
    });
});