const fs = require('fs');
const path = require('path');
const { parseInput, maxBridgeStrength, longestBridge } = require('./bridges');

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const components = parseInput(input);
console.log(maxBridgeStrength(components));
console.log(longestBridge(components));
