module.exports = function captcha(input, step = input.length / 2) {
    const length = input.length;

    let result = 0;

    let i = 0;
    for (i; i < length; i++) {
        if (input[i] === input[(i + step) % length]) {
            result += parseInt(input[i], 10);
        }
    }

    return result;
};