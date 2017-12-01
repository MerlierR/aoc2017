const captcha = require('../day1/captcha');

describe('Day 1: Inverse Captcha', () => {
    const data = [
        { input: '1122', result: 3 },
        { input: '1111', result: 4 },
        { input: '1234', result: 0 },
        { input: '91212129', result: 9 }
    ];

    data.forEach((entry) => it(`has the correct result (${entry.result}) for "${entry.input}"`, () => {
        expect(captcha(entry.input)).toBe(entry.result);
    }));
});