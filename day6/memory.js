class Memory {

    constructor(/**number[]*/ banks) {
        this.banks = banks;
        this.knownConfigurations = {};
    }

    reallocate() {
        let i = 0;
        while (!this.isKnownConfiguration()) {
            const maxBS = this.getMaxBlockSizeIndex();
            this.redistribute(maxBS);
            i += 1;
        }

        return i;
    }

    getMaxBlockSizeIndex() {
        const maxBS = Math.max(...this.banks);
        return this.banks.findIndex((bs) => bs === maxBS);
    }

    redistribute(/**number*/ indexToRedistribute) {
        const numberOfBanks = this.banks.length;
        const blocks = this.banks[indexToRedistribute];
        this.banks[indexToRedistribute] = 0;

        let i;
        for (i = 0; i < blocks; i += 1) {
            const index = (indexToRedistribute + 1 + i) % numberOfBanks;
            this.banks[index] += 1;
        }
    }

    isKnownConfiguration() {
        const hash = this.hash();

        if (!this.knownConfigurations[hash]) {
            this.knownConfigurations[hash] = true;
            return false;
        }

        return true;
    }

    hash() {
        return JSON.stringify(this.banks);
    }
}

module.exports = Memory;