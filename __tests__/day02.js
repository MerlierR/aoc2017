const fs = require('fs');
const path = require('path');
const { checksum, checksumRow } = require('../day02/checksum');
const { evenlyDivisibleValues, evenlyDivisibleValuesRow } = require('../day02/evenlyDivisibleValues');
const fileOperation = require('../day02/fileOperation');

describe('Day 2: Checksum', () => {

    describe('Min Max', () => {
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
            const filePath = path.join(__dirname, 'day02.minmax.txt');

            expect(fs.existsSync(filePath)).toBe(true);

            expect(await fileOperation(filePath, checksumRow)).toBe(18);
        });
    });

    describe('Evenly Divisible Values', () => {
        const data = [
            [5, 9, 2, 8],
            [9, 4, 7, 3],
            [3, 8, 6, 5]
        ];

        it('calculates the row checksums correctly', () => {
            expect(evenlyDivisibleValuesRow(data[0])).toBe(4);
            expect(evenlyDivisibleValuesRow(data[1])).toBe(3);
            expect(evenlyDivisibleValuesRow(data[2])).toBe(2);

            expect(evenlyDivisibleValuesRow([5, 13])).toBe(0);
        });

        it('calculates the checksum corectly', () => {
            expect(evenlyDivisibleValues(data)).toBe(9);
        });

        it('can read and parse a file', async () => {
            const filePath = path.join(__dirname, 'day02.evenly-divisible-values.txt');

            expect(fs.existsSync(filePath)).toBe(true);
            expect(await fileOperation(filePath, evenlyDivisibleValuesRow)).toBe(9);
        });
    });
});