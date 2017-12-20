const fs = require('fs');
const path = require('path');
const { parseInput, closestDistance, collide, solveQuadraticEquation } = require('../day20/particle');

describe('Day 12: Particle Swarm', () => {

    const testInput = `
p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>`.trim();

    it('can parse input', () => {
        const particles = parseInput(testInput);

        expect(particles.length).toBe(2);

        expect(particles[0].p).toEqual([3, 0, 0]);
        expect(particles[0].v).toEqual([2, 0, 0]);
        expect(particles[0].a).toEqual([-1, 0, 0]);

        expect(particles[1].p).toEqual([4, 0, 0]);
        expect(particles[1].v).toEqual([0, 0, 0]);
        expect(particles[1].a).toEqual([-2, 0, 0]);
    });

    it('can calculate distances', () => {
        const particles = parseInput(testInput);

        expect(particles[0].distance()).toBe(3);
        expect(particles[1].distance()).toBe(4);
    });

    it('can calculate a next tick', () => {
        const particles = parseInput(testInput);

        expect(particles[0].distance()).toBe(3);
        expect(particles[0].canGetCloser()).toBe(true);
        expect(particles[1].distance()).toBe(4);
        expect(particles[1].canGetCloser()).toBe(true);

        particles.forEach((p) => p.tick());
        expect(particles[0].distance()).toBe(4);
        expect(particles[0].canGetCloser()).toBe(true);
        expect(particles[1].distance()).toBe(2);
        expect(particles[1].canGetCloser()).toBe(true);

        particles.forEach((p) => p.tick());
        expect(particles[0].distance()).toBe(4);
        expect(particles[0].canGetCloser()).toBe(true);
        expect(particles[1].distance()).toBe(2);
        expect(particles[1].canGetCloser()).toBe(false);

        particles.forEach((p) => p.tick());
        expect(particles[0].distance()).toBe(3);
        expect(particles[0].canGetCloser()).toBe(true);
        expect(particles[1].distance()).toBe(8);
        expect(particles[1].canGetCloser()).toBe(false);

        particles.forEach((p) => p.tick());
        expect(particles[0].distance()).toBe(1);
        expect(particles[0].canGetCloser()).toBe(true);
        expect(particles[1].distance()).toBe(16);
        expect(particles[1].canGetCloser()).toBe(false);

        particles.forEach((p) => p.tick());
        expect(particles[0].distance()).toBe(2);
        expect(particles[0].canGetCloser()).toBe(false);
        expect(particles[1].distance()).toBe(26);
        expect(particles[1].canGetCloser()).toBe(false);
    });

    it('can calculate velocities at random ticks', () => {
        const [pA, pB] = parseInput(testInput);

        expect(pA.positionAt(0)).toEqual([3, 0, 0]);
        expect(pA.positionAt(1)).toEqual([4, 0, 0]);
        expect(pA.positionAt(2)).toEqual([4, 0, 0]);
        expect(pA.positionAt(3)).toEqual([3, 0, 0]);
        expect(pA.positionAt(4)).toEqual([1, 0, 0]);
        expect(pA.positionAt(5)).toEqual([-2, 0, 0]);

        expect(pB.positionAt(0)).toEqual([4, 0, 0]);
        expect(pB.positionAt(1)).toEqual([2, 0, 0]);
        expect(pB.positionAt(2)).toEqual([-2, 0, 0]);
        expect(pB.positionAt(3)).toEqual([-8, 0, 0]);
        expect(pB.positionAt(4)).toEqual([-16, 0, 0]);
        expect(pB.positionAt(5)).toEqual([-26, 0, 0]);
    });

    it('can calculate distances at ticks', () => {
        const [pA] = parseInput(testInput);

        expect(pA.distanceAt(0)).toBe(3);
        expect(pA.distanceAt(1)).toBe(4);
        expect(pA.distanceAt(2)).toBe(4);
        expect(pA.distanceAt(3)).toBe(3);
        expect(pA.distanceAt(4)).toBe(1);
        expect(pA.distanceAt(5)).toBe(2);
    });

    it('can calculate the closest distance in the long run', () => {
        const particles = parseInput(testInput);
        expect(closestDistance(particles)).toBe(0);
    });

    it('can solve quadratic equations', () => {
        expect(solveQuadraticEquation(1, 0, 0)).toEqual([0, -0]);
        expect(solveQuadraticEquation(1, -3, -4)).toEqual([4, -1]);
        expect(solveQuadraticEquation(1, 0, -4)).toEqual([2, -2]);
    });

    it('can calculate the closest distance in the long run (input)', () => {
        const particles = parseInput(fs.readFileSync(path.join(__dirname, '../day20/input.txt'), 'utf8'));
        expect(closestDistance(particles)).toBe(157);
    });

    it('can calculate the remaining particles after collistion', () => {
        const particles = parseInput(fs.readFileSync(path.join(__dirname, '../day20/input.txt'), 'utf8'));
        expect(collide(particles)).toBe(499);
    });
});