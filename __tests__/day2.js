const fs = require('fs');
const path = require('path');
const { checksum, checksumRow } = require('../day2/checksum');
const fileChecksum = require('../day2/fileChecksum');

describe('Day 2: Checksum', () => {
    const data = [
        [6, 1, 9, 5],
        [7, 5, 3],
        [2, 4, 6, 8]
    ];

    it('calculates the row checksums correctly', () => {
        expect(checksumRow(data[0])).toBe(8);
        expect(checksumRow(data[1])).toBe(4);
        expect(checksumRow(data[2])).toBe(6);
    });

    it('calculates the checksum corectly', () => {
        expect(checksum(data)).toBe(18);
    });

    it('can read and parse a file', async () => {
        const filePath = path.join(__dirname, 'day2.testinput.txt');

        expect(fs.existsSync(filePath)).toBe(true);

        expect(await fileChecksum(filePath)).toBe(18);
    });
});