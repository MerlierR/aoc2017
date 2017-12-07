const fs = require('fs');
const path = require('path');
const Tower = require('../day7/tower');

describe('Day 7', () => {

    it('can get the root of the tower', () => {
        const filePath = path.join(__dirname, 'day7.txt');
        expect(fs.existsSync(filePath));

        const input = fs.readFileSync(filePath, 'utf8').split('\n');
        expect(input.length).toBe(13);

        const tower = Tower.fromConfig(input);

        expect(tower.name).toBe('tknk');
    });

});