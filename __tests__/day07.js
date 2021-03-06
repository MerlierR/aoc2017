const fs = require('fs');
const path = require('path');
const Tower = require('../day07/tower');

describe('Day 7', () => {

    it('can get the root of the tower', () => {
        const filePath = path.join(__dirname, 'day07.txt');
        expect(fs.existsSync(filePath));

        const input = fs.readFileSync(filePath, 'utf8').split('\n');
        expect(input.length).toBe(13);

        const tower = Tower.fromConfig(input);

        expect(tower.name).toBe('tknk');
    });

    it('can find the unbalanced tower', () => {
        const filePath = path.join(__dirname, 'day07.txt');
        const input = fs.readFileSync(filePath, 'utf8').split('\n');
        const tower = Tower.fromConfig(input);

        const correction = tower.findIncorrectDiskAndCorrection();

        expect(correction.disk.name).toBe('ugml');
        expect(correction.weight).toBe(60);
    });
});