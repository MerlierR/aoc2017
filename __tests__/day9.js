const fs = require('fs');
const path = require('path');
const Stream = require('../day9/stream');

describe('Day 9', () => {

    it('can calculate stream scores', () => {
        expect(Stream.parse('{}')[0].getTotalScore()).toBe(1);
        expect(Stream.parse('{{{}}}')[0].getTotalScore()).toBe(6);
        expect(Stream.parse('{{},{}}')[0].getTotalScore()).toBe(5);
        expect(Stream.parse('{{{},{},{{}}}}')[0].getTotalScore()).toBe(16);
        expect(Stream.parse('{<a>,<a>,<a>,<a>}')[0].getTotalScore()).toBe(1);
        expect(Stream.parse('{{<ab>},{<ab>},{<ab>},{<ab>}}')[0].getTotalScore()).toBe(9);
        expect(Stream.parse('{{<!!>},{<!!>},{<!!>},{<!!>}}')[0].getTotalScore()).toBe(9);
        expect(Stream.parse('{{<a!>},{<a!>},{<a!>},{<ab>}}')[0].getTotalScore()).toBe(3);
    });

    it('can calculate garbage counts', () => {
        expect(Stream.parse('<random characters>')[0].getGarbageCount()).toBe(17);
        expect(Stream.parse('<<<<>')[0].getGarbageCount()).toBe(3);
        expect(Stream.parse('<{!>}>')[0].getGarbageCount()).toBe(2);
        expect(Stream.parse('<!!>')[0].getGarbageCount()).toBe(0);
        expect(Stream.parse('<{o"i!a,<{i<a>')[0].getGarbageCount()).toBe(10);
    });
});