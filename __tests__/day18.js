const InstructionSet = require('../day18/InstructionSet');

describe('Day 18: Duet', () => {
    it('can outputs the first receive instruction', async () => {
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

        const [is0, is1] = InstructionSet.parseInput(input);
        const result = await Promise.all([is0.execute(), is1.execute()])

        expect(result.length).toBe(2);
        expect(result[0]).toBe(1);
        expect(result[1]).toBe(1);
    });

    it('can do the math', async () => {
        const input = [
            'set i 31',
            'set a 1',
            'mul p 17',
            'jgz p p',
            'mul a 2',
            'add i -1',
            'jgz i -2',
            'add a -1',
            'set i 127',
            'set p 735',
            'mul p 8505',
            'mod p a',
            'mul p 129749',
            'add p 12345',
            'mod p a',
            'set b p',
            'mod b 10000',
            'snd b',
            'add i -1',
            'jgz i -9',
            'jgz a 3',
            'rcv b',
            'jgz b -1',
            'set f 0',
            'set i 126',
            'rcv a',
            'rcv b',
            'set p a',
            'mul p -1',
            'add p b',
            'jgz p 4',
            'snd a',
            'set a b',
            'jgz 1 3',
            'snd b',
            'set f 1',
            'add i -1',
            'jgz i -11',
            'snd a',
            'jgz f -16',
            'jgz a -19'
        ];

        const [isA, isB] = InstructionSet.parseInput(input);

        const [nsA, nsB] = await Promise.all([
            isA.execute(),
            isB.execute()
        ]);

        expect(nsB).toBe(7239);
    });
});