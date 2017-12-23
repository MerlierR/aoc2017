const EventEmitter = require('events');

const Register = require('../day18/Register');

class InstructionSet extends EventEmitter {

    /// Construction
    constructor(/**number*/ pid) {
        super();

        this.pid = pid;
        this.waiting = false;

        /**@private*/ this.currentIndex = 0;
        /**@private*/ this.instructions = null;
        /**@private*/ this.registers = [];
        /**@private*/ this.queue = [];

        this.debug = false;
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

    /// Execution
    execute() {
        this.currentIndex = 0;
        let numberOfMuls = 0;
        let length = this.instructions.length;

        while (this.currentIndex < length) {
            const instruction = this.instructions[this.currentIndex];
            if (instruction.name === 'mul') numberOfMuls++;

            instruction.fn();
            this.currentIndex += 1;
        }

        return numberOfMuls;
    }

    //<editor-fold desc="Instructions">
    set(/**string*/ name, value) {
        this.findRegister(name).set(this.getValue(value));
    }

    sub(/**string*/ name, value) {
        this.findRegister(name).add(-1 * this.getValue(value));
    }

    mul(/**string*/ name, value) {
        this.findRegister(name).mul(this.getValue(value));
    }

    jnz(value, offset) {
        if (this.getValue(value) !== 0) {
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
            let value = this.pid;
            if (this.debug && name === 'a') value = 1;

            const newRegister = new Register(name, value);
            this.registers.push(newRegister);
            return newRegister;
        }

        return register;
    }

    //</editor-fold>
}


InstructionSet.parseInput = (/**string[]*/ input) => {
    const isA = new InstructionSet(0);

    isA.withInstructions(input.map((i) => parseInstruction(i, isA)));

    return isA;
};

function parseInstruction(/**string*/ input, /**InstructionSet*/ instructionSet) {
    const args = input.split(' ');

    if (args.length <= 1) throw new Error(`Could not parse instruction "${input}"`);
    switch (args[0]) {
        case 'set': {
            const registerName = args[1];
            const value = args[2];
            return {
                name: 'set',
                fn: instructionSet.set.bind(instructionSet, registerName, value)
            };
        }
        case 'sub': {
            const registerName = args[1];
            const value = args[2];
            return {
                name: 'sub',
                fn: instructionSet.sub.bind(instructionSet, registerName, value)
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
        case 'jnz': {
            const value = args[1];
            const offset = args[2];
            return {
                name: 'jnz',
                fn: instructionSet.jnz.bind(instructionSet, value, offset)
            };
        }
        default:
            throw new Error(`Unknown instruction: "${args[0]}" from instruction "${input}"`);
    }
}

module.exports = InstructionSet;