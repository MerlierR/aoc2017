const captcha = require('../day1/captcha');

describe('Day 1: Inverse Captcha', () => {
    const dataPart1 = [
        { input: '1122', result: 3 },
        { input: '1111', result: 4 },
        { input: '1234', result: 0 },
        { input: '91212129', result: 9 }
    ];

    dataPart1.forEach((entry) => it(`has the correct result (${entry.result}) for "${entry.input}"`, () => {
        expect(captcha(entry.input, 1)).toBe(entry.result);
    }));

    const dataPart2 = [
        { input: '1212', result: 6 },
        { input: '1221', result: 0 },
        { input: '123425', result: 4 },
        { input: '123123', result: 12 },
        { input: '12131415', result: 4 }
    ];

    dataPart2.forEach((entry) => it(`has the correct result (${entry.result}) for "${entry.input}"`, () => {
        expect(captcha(entry.input)).toBe(entry.result);
    }));
});