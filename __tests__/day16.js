const fs = require('fs');
const path = require('path');
const dance = require('../day16/dance');

describe('Day 16: dancing', () => {

    it('can make the correct moves', () => {
        expect(dance('s1', 1, ['a', 'b', 'c', 'd', 'e'])).toEqual('eabcd');
        expect(dance('x3/4', 1, ['e', 'a', 'b', 'c', 'd'])).toEqual('eabdc');
        expect(dance('pe/b', 1, ['e', 'a', 'b', 'd', 'c'])).toEqual('baedc');
    });

    it('can make the correct sequence', () => {
        expect(dance('s1,x3/4,pe/b', 1, ['a', 'b', 'c', 'd', 'e'])).toEqual('baedc');
    });

    it('can make the correct large sequence', () => {
        const input = fs.readFileSync(path.join(__dirname, '../day16/input.txt'), 'utf8');
        expect(dance(input, 1)).toBe('cgpfhdnambekjiol');
    });

    it('can make the move set multiple times', () => {
        expect(dance('s1,x3/4,pe/b', 2, ['a', 'b', 'c', 'd', 'e'])).toEqual('ceadb');
    });
});