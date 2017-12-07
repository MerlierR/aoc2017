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
            weight: weightString.substring(1, weightString.length - 1),
            subTowerNames
        };
    }
};

module.exports = Tower;