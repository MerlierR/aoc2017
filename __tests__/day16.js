const dance = require('../day16/dance');

describe('Day 16: dancing', () => {

    it('can make the correct moves', () => {
        expect(dance('s1', ['a', 'b', 'c', 'd', 'e'])).toEqual(['e', 'a', 'b', 'c', 'd']);
        expect(dance('x3/4', ['e', 'a', 'b', 'c', 'd'])).toEqual(['e', 'a', 'b', 'd', 'c']);
        expect(dance('pe/b', ['e', 'a', 'b', 'd', 'c'])).toEqual(['b', 'a', 'e', 'd', 'c']);
    });

    it('can make the correct sequence', () => {
        expect(dance('s1,x3/4,pe/b', ['a', 'b', 'c', 'd', 'e'])).toEqual(['b', 'a', 'e', 'd', 'c']);
    });
});