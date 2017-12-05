const fs = require('fs');
const path = require('path');
const { isValid, isValidFile } = require('../day4/passphrase');

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
            const filePath = path.join(__dirname, 'day4.passphrases.txt');
            expect(fs.existsSync(filePath)).toBe(true);

            const result = await isValidFile(filePath);
            expect(result.numberOfPhrases).toBe(3);
            expect(result.numberOfValidPhrases).toBe(2);
        });
    });
});