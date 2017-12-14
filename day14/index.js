const { count, createGrid, countRegions } = require('./defragment');

let grid = createGrid('vbqugkhl');
console.log(count(grid));
console.log(countRegions(grid));