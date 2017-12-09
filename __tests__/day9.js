const fs = require('fs');
const path = require('path');
const Stream = require('../day9/stream');

describe('Day 9', () => {

    it('can parse stream scores', () => {
        expect(Stream.parse('{}')[0].getTotalScore()).toBe(1);
        expect(Stream.parse('{{{}}}')[0].getTotalScore()).toBe(6);
        expect(Stream.parse('{{},{}}')[0].getTotalScore()).toBe(5);
        expect(Stream.parse('{{{},{},{{}}}}')[0].getTotalScore()).toBe(16);
        expect(Stream.parse('{<a>,<a>,<a>,<a>}')[0].getTotalScore()).toBe(1);
        expect(Stream.parse('{{<ab>},{<ab>},{<ab>},{<ab>}}')[0].getTotalScore()).toBe(9);
        expect(Stream.parse('{{<!!>},{<!!>},{<!!>},{<!!>}}')[0].getTotalScore()).toBe(9);
        expect(Stream.parse('{{<a!>},{<a!>},{<a!>},{<ab>}}')[0].getTotalScore()).toBe(3);
    });
});