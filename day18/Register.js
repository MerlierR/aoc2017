module.exports = class Register {

    constructor(/**string*/ name, /**number*/ value) {
        this.name = name;
        this.value = value;
    }

    set(value) {
        this.value = value;
    }

    add(/**number*/ value) {
        this.value += value;
    }

    mul(/**number*/ value) {
        this.value *= value;
    }

    mod(/**number*/ value) {
        this.value %= value;
    }
};