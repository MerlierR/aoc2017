const fs = require('fs');
const path = require('path');

const checksum = require('./checksum');
const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

console.log(checksum(data));

