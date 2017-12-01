module.exports = function captcha(input) {
    const adjustedInput = input + input.substr(0, 1);
    const length = input.length;

    let result = 0;

    let i = 0;
    for (i; i < length; i++) {
        if (adjustedInput[i] === adjustedInput[i + 1]) {
            result += parseInt(adjustedInput[i], 10);
        }
    }

    return result;
};