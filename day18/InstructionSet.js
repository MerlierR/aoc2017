const Register = require('./Register');

class InstructionSet {

    constructor() {
        /**@private*/ this.currentIndex = 0;
        /**@private*/ this.instructions = null;
        /**@private*/ this.registers = [];
        /**@private*/ this.lastPlayedFrequency = null;
    }

    withInstructions(instructions) {
        this.instructions = instructions;
        return this;
    }

    * execute() {
        this.currentIndex = 0;
        const l = this.instructions.length;

        while (this.currentIndex < l) {
            const instruction = this.instructions[this.currentIndex];
            const result = instruction.fn();
            this.currentIndex += 1;

            if (instruction.name === 'rcv' && result) yield result;
        }
    }

    getValue(value) {
        const valueAsInt = parseInt(value, 10);
        if (isNaN(valueAsInt)) return this.findRegister(value).value;
        return valueAsInt;
    }

    findRegister(/**string*/ name) {
        const register = this.registers.find((r) => r.name === name);

        if (!register) {
            const newRegister = new Register(name, 0);
            this.registers.push(newRegister);
            return newRegister;
        }

        return register;
    }

    playSound(value) {
        this.lastPlayedFrequency = this.getValue(value);
        return this.lastPlayedFrequency;
    }

    set(/**string*/ name, value) {
        const register = this.findRegister(name);

        register.value = this.getValue(value);
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

    recover(/**number*/ value) {
        if (this.getValue(value) === 0) return;
        return this.lastPlayedFrequency;
    }

    jumpIfGreaterThanZero(/**number*/ value, /**number*/ offset) {
        if (this.getValue(value) > 0) {
            // - 1: executing instructions will automatically add 1 to the current index
            this.currentIndex += offset - 1;
        }
    }
}


InstructionSet.parseInput = (/**string[]*/ input) => {
    const is = new InstructionSet();
    return is.withInstructions(input.map((i) => parseInstruction(i, is)));
};

function parseInstruction(/**string*/ input, /**InstructionSet*/ instructionSet) {
    const args = input.split(' ');

    if (args.length <= 1) throw new Error(`Could not parse instruction "${input}"`);
    switch (args[0]) {
        case 'snd': {
            const value = args[1];
            return {
                name: 'snd',
                fn: instructionSet.playSound.bind(instructionSet, value)
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
                fn: instructionSet.recover.bind(instructionSet, value)
            };
        }
        case 'jgz': {
            const value = args[1];
            const offset = parseInt(args[2], 10);
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