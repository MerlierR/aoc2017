class Tower {

    constructor(name, weight) {
        this.name = name;
        this.weight = weight;
        this.subTowers = [];
    }

    setWeight(weight) {
        this.weight = weight;
    }

    setSubTowers(/**Tower[]*/ subTowers) {
        this.subTowers = subTowers;
    }

    getFullWeight() {
        return this.weight + this.subTowers.reduce((fw, st) => fw + st.getFullWeight(), 0);
    }

    hasCorrectBalance() {
        let correct = true;

        let i = 0;
        let weightToCheck;
        while (correct && i < this.subTowers.length) {
            if (!weightToCheck) {
                weightToCheck = this.weight + this.subTowers[i].getFullWeight();
            } else {
                correct = correct && weightToCheck === (this.weight + this.subTowers[i].getFullWeight());
            }

            i += 1;
        }

        return correct;
    }

    findUnbalancedSubTower() {
        if (this.hasCorrectBalance()) {
            return null;
        }

        const unbalancedSubTower = this.subTowers.find((st) => !st.hasCorrectBalance());
        if (unbalancedSubTower) {
            return unbalancedSubTower.findUnbalancedSubTower();
        } else {
            return this;
        }
    }

    findIncorrectDiskAndCorrection() {
        const unbalanced = this.findUnbalancedSubTower();
        if (unbalanced.subTowers.length === 2) throw new Error('Should not happen');

        const subsByFullWeight = unbalanced.subTowers.reduce((acc, st) => {
            const fw = st.getFullWeight();
            if (!acc[fw]) acc[fw] = [];

            acc[fw].push(st);

            return acc;
        }, {});

        let fullWeightCounts = Object.values(subsByFullWeight).map((subs) => subs.length);

        const maxCount = Math.max(...fullWeightCounts);
        const minCount = Math.min(...fullWeightCounts);

        const correctWeight = Object.keys(subsByFullWeight).find((weight) => subsByFullWeight[weight].length === maxCount);
        const wrongWeight = Object.keys(subsByFullWeight).find((weight) => subsByFullWeight[weight].length === minCount);
        const delta = correctWeight - wrongWeight;

        const wrongNode = subsByFullWeight[wrongWeight][0];

        return {
            disk: wrongNode,
            weight: wrongNode.weight + delta
        };
    }
}

Tower.fromConfig = function (/**string[]*/ inputs) {
    const towers = {};
    const references = new Set();

    inputs.forEach((input) => {
        const { name, weight, subTowerNames } = parseInput(input);

        // Create or update the tower
        if (!towers[name]) {
            towers[name] = new Tower(name, weight);
        } else {
            towers[name].setWeight(weight);
        }

        // Get all subTowers
        const /**Tower[]*/ subTowers = subTowerNames.map((subTowerName) => {
            references.add(subTowerName);

            if (!towers[subTowerName]) towers[subTowerName] = new Tower(subTowerName);

            return towers[subTowerName];
        });

        towers[name].setSubTowers(subTowers);
    });

    const referenceArray = [...references];
    const rootTowerName = Object.keys(towers).find((name) => !referenceArray.includes(name));

    return towers[rootTowerName];

    function parseInput(input) {
        const [nameAndWeight, subTowersString] = input.split('->');

        const [name, weightString] = nameAndWeight.trim().split(' ');
        const subTowerNames = subTowersString ? subTowersString.split(',').map((s) => s.trim()) : [];

        return {
            name,
            weight: parseInt(weightString.substring(1, weightString.length - 1), 10),
            subTowerNames
        };
    }
};

module.exports = Tower;