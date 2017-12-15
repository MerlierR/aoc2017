const judge = require('./judge');
const { generatorA, generatorB } = require('./generator');

console.log(judge(generatorA, generatorB));