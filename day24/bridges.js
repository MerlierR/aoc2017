module.exports = { parseInput, maxBridgeStrength, longestBridge };

function parseInput(input) {
    return input
        .split('\n')
        .reduce((acc, line) => {
            const split = line.split('/');
            const from = parseInt(split[0]);
            const to = parseInt(split[1]);

            if (!acc.has(from)) acc.set(from, new Set());
            acc.get(from).add(to);

            if (!acc.has(to)) acc.set(to, new Set());
            acc.get(to).add(from);

            return acc;
        }, new Map());
}

function maxBridgeStrength(components, start = 0) {
    const choicesSet = components.get(start);
    if (!choicesSet || choicesSet.size === 0) return 0;

    const choices = [...choicesSet];
    const strengths = choices.map((choice) => {
        const componentCopy = new Map([...components]);

        const choicesWithoutMe = new Set(choices.filter((c) => c !== choice));
        componentCopy.set(start, choicesWithoutMe);

        const startsWithoutMe = new Set([...components.get(choice)].filter((s) => s !== start));
        componentCopy.set(choice, startsWithoutMe);

        return maxBridgeStrength(componentCopy, choice) + start + choice;
    });

    return Math.max(...strengths);
}

function longestBridge(components, start = 0, length = 0, strength = 0) {
    const choicesSet = components.get(start);
    if (!choicesSet || choicesSet.size === 0) return { length, strength };

    const choices = [...choicesSet];
    const lengthAndStrengths = choices.map((choice) => {
        const componentCopy = new Map([...components]);

        const choicesWithoutMe = new Set(choices.filter((c) => c !== choice));
        componentCopy.set(start, choicesWithoutMe);

        const startsWithoutMe = new Set([...components.get(choice)].filter((s) => s !== start));
        componentCopy.set(choice, startsWithoutMe);

        return longestBridge(componentCopy, choice, length + 1, strength + start + choice);
    });

    const maxLen = Math.max(...lengthAndStrengths.map((lns) => lns.length));
    const filtered = lengthAndStrengths.filter((lns) => lns.length === maxLen);

    const maxStrength = Math.max(...filtered.map((lns) => lns.strength));
    return filtered.filter((lns) => lns.strength === maxStrength)[0];
}