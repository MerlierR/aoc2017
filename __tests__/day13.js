const fs = require('fs');
const path = require('path');
const { Layer, parseInput, walk } = require('../day13/scanner');

describe('Day 13', () => {
    describe('Layer', () => {
        it('has the correct position at the input tick', () => {
            const layer = new Layer(0, 5);

            expect(layer.positionAtTick(0)).toBe(0);
            expect(layer.positionAtTick(1)).toBe(1);
            expect(layer.positionAtTick(2)).toBe(2);
            expect(layer.positionAtTick(3)).toBe(3);
            expect(layer.positionAtTick(4)).toBe(4);
            expect(layer.positionAtTick(5)).toBe(3);
            expect(layer.positionAtTick(6)).toBe(2);
            expect(layer.positionAtTick(7)).toBe(1);
            expect(layer.positionAtTick(8)).toBe(0);
            expect(layer.positionAtTick(9)).toBe(1);
            expect(layer.positionAtTick(10)).toBe(2);
            expect(layer.positionAtTick(11)).toBe(3);
            expect(layer.positionAtTick(12)).toBe(4);
            expect(layer.positionAtTick(13)).toBe(3);
            expect(layer.positionAtTick(14)).toBe(2);
            expect(layer.positionAtTick(15)).toBe(1);
            expect(layer.positionAtTick(16)).toBe(0);
            expect(layer.positionAtTick(17)).toBe(1);
            expect(layer.positionAtTick(18)).toBe(2);
            expect(layer.positionAtTick(19)).toBe(3);
            expect(layer.positionAtTick(20)).toBe(4);
            expect(layer.positionAtTick(21)).toBe(3);
            expect(layer.positionAtTick(22)).toBe(2);
            expect(layer.positionAtTick(23)).toBe(1);
            expect(layer.positionAtTick(24)).toBe(0);
            expect(layer.positionAtTick(25)).toBe(1);
        });
    });

    it('can parse an input', () => {
        const file = path.join(__dirname, 'day13.input.txt');
        expect(fs.existsSync(file)).toBe(true);

        const data = fs.readFileSync(file, 'utf8');
        const result = parseInput(data);

        expect(result.length).toBe(7);

        expect(result[0]).toBeDefined();
        expect(result[0].depth).toBe(0);
        expect(result[0].range).toBe(3);

        expect(result[1]).toBeDefined();
        expect(result[1].depth).toBe(1);
        expect(result[1].range).toBe(2);

        expect(result[2]).not.toBeDefined();

        expect(result[3]).not.toBeDefined();

        expect(result[4]).toBeDefined();
        expect(result[4].depth).toBe(4);
        expect(result[4].range).toBe(4);

        expect(result[5]).not.toBeDefined();

        expect(result[6]).toBeDefined();
        expect(result[6].depth).toBe(6);
        expect(result[6].range).toBe(4);
    });

    it('can walk the scanner', () => {
        const file = path.join(__dirname, 'day13.input.txt');
        expect(fs.existsSync(file)).toBe(true);

        const data = fs.readFileSync(file, 'utf8');
        const scanner = parseInput(data);

        expect(walk(scanner)).toBe(24);
    });
});