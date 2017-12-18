const EventEmitter = require('events');

const Register = require('./Register');

class InstructionSet extends EventEmitter {

    /// Construction
    constructor(/**number*/ name) {
        super();

        this.name = name;
        this.waiting = false;

        /**@private*/ this.currentIndex = 0;
        /**@private*/ this.instructions = null;
        /**@private*/ this.registers = [];
        /**@private*/ this.queue = [];
    }

    withInstructions(instructions) {
        this.instructions = instructions;
        return this;
    }

    withSender(/**InstructionSet*/ sender) {
        this.sender = sender;
        this.sender.on('send', (value) => {
            this.queue.push(value);
            this.waiting = false;
        });

        return this;
    }

    hasDeadLock() {
        return this.waiting && this.sender.waiting;
    }

    /// Execution
    async execute() {
        this.currentIndex = 0;
        let numberOfSends = 0;

        while (true) {
            const instruction = this.instructions[this.currentIndex];

            if (instruction.name === 'snd') numberOfSends += 1;
            if (instruction.name === 'rcv' && this.queue.length === 0) {
                this.emit('waiting');
                this.waiting = true;
            }
            if (this.hasDeadLock()) break;

            await instruction.fn();
            this.currentIndex += 1;
        }

        this.sender.removeAllListeners('waiting');
        this.sender.removeAllListeners('send');
        return numberOfSends;
    }

    // Communication
    send(value) {
        this.emit('send', this.getValue(value));
    }

    async receive(/**string*/ name) {
        if (this.waiting) {
            await new Promise((res) => {
                this.sender.once('waiting', () => {
                    // Waiting event, going into deadlock
                    this.sender.removeAllListeners('send');
                    res();
                });
                this.sender.once('send', (...args) => {
                    this.sender.removeAllListeners('waiting');
                    res();
                });
            });
        }

        if (this.queue.length > 0) this.set(name, this.queue.shift());
    }

    //<editor-fold desc="Instructions">
    set(/**string*/ name, value) {
        this.findRegister(name).set(this.getValue(value));
    }

    add(/**string*/ name, value) {
        this.findRegister(name).add(this.getValue(value));
    }

    mul(/**string*/ name, value) {
        this.findRegister(name).mul(this.getValue(value));
    }

    mod(/**string*/ name, value) {
        this.findRegister(name).mod(this.getValue(value));
    }

    jumpIfGreaterThanZero(value, offset) {
        if (this.getValue(value) > 0) {
            // - 1: executing instructions will automatically add 1 to the current index
            this.currentIndex += this.getValue(offset) - 1;
        }
    }

    //</editor-fold>

    //<editor-fold desc="Helpers">

    /**@private*/
    getValue(value) {
        const valueAsInt = parseInt(value, 10);

        if (!isNaN(valueAsInt)) return valueAsInt;
        else return this.findRegister(value).value;
    }

    /**@private*/
    findRegister(/**string*/ name) {
        const register = this.registers.find((r) => r.name === name);

        if (!register) {
            const newRegister = new Register(name, this.name);
            this.registers.push(newRegister);
            return newRegister;
        }

        return register;
    }

    //</editor-fold>
}


InstructionSet.parseInput = (/**string[]*/ input) => {
    const isA = new InstructionSet(0);
    const isB = new InstructionSet(1);

    isA.withInstructions(input.map((i) => parseInstruction(i, isA))).withSender(isB);
    isB.withInstructions(input.map((i) => parseInstruction(i, isB))).withSender(isA);

    return [isA, isB];
};

function parseInstruction(/**string*/ input, /**InstructionSet*/ instructionSet) {
    const args = input.split(' ');

    if (args.length <= 1) throw new Error(`Could not parse instruction "${input}"`);
    switch (args[0]) {
        case 'snd': {
            const value = args[1];
            return {
                name: 'snd',
                fn: instructionSet.send.bind(instructionSet, value)
            };
        }
        case 'set': {
            const registerName = args[1];
            const value = args[2];
            return {
                name: 'set',
                fn: instructionSet.set.bind(instructionSet, registerName, value)
            };
        }
        case 'add': {
            const registerName = args[1];
            const value = args[2];
            return {
                name: 'add',
                fn: instructionSet.add.bind(instructionSet, registerName, value)
            };
        }
        case 'mul': {
            const registerName = args[1];
            const value = args[2];
            return {
                name: 'mul',
                fn: instructionSet.mul.bind(instructionSet, registerName, value)
            };
        }
        case 'mod': {
            const registerName = args[1];
            const value = args[2];
            return {
                name: 'mod',
                fn: instructionSet.mod.bind(instructionSet, registerName, value)
            };
        }
        case 'rcv': {
            const value = args[1];
            return {
                name: 'rcv',
                fn: instructionSet.receive.bind(instructionSet, value)
            };
        }
        case 'jgz': {
            const value = args[1];
            const offset = args[2];
            return {
                name: 'jgz',
                fn: instructionSet.jumpIfGreaterThanZero.bind(instructionSet, value, offset)
            };
        }
        default:
            throw new Error(`Unknown instruction: "${args[0]}" from instruction "${input}"`);
    }
}

module.exports = InstructionSet;