const InstructionSet = require('../day18/InstructionSet');

describe('Day 18: Duet', () => {
    it('can outputs the first recover instruction', () => {
        const input = [
            'set a 1',
            'add a 2',
            'mul a a',
            'mod a 5',
            'snd a',
            'set a 0',
            'rcv a',
            'jgz a -1',
            'set a 1',
            'jgz a -2'
        ];

        const instructionSet = InstructionSet.parseInput(input);
        const generator = instructionSet.execute();

        expect(generator.next().value).toBe(4);
    });


});