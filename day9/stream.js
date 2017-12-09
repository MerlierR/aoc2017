class HasScore {
    constructor(score) {
        this.score = score;
    }

    getTotalScore() {
        return this.score;
    }
}

class Content extends HasScore {
    constructor(content) {
        super(0);
        this.content = content;
    }

    getGarbageCount() {
        if (!this.content) return 0;

        const length = this.content.length;
        let result = 0;
        let i = 0;

        while (i < length) {
            const char = this.content[i];
            if (char === '!') i += 2;
            else {
                result += 1;
                i += 1;
            }
        }

        return result;
    }
}

class Stream extends HasScore {

    constructor(content, score) {
        super(score);
        this.content = content;
    }

    getTotalScore() {
        return this.score + (this.content || []).reduce((acc, content) => acc + content.getTotalScore(), 0);
    }

    getGarbageCount() {
        return (this.content || []).reduce((acc, content) => acc + content.getGarbageCount(), 0);
    }
}

Stream.parse = function (input, parentScore = 0) {
    const length = input.length;

    if (length === 0) return [new Content(null)];

    let i = 0;
    let results = [];
    while (i < length) {
        const char = input[i];

        if (char === '{') {
            // Start of stream
            const closingIndex = findClosingStreamIndex(i);
            const content = Stream.parse(input.slice(i + 1, closingIndex), parentScore + 1);
            results.push(new Stream(content, parentScore + 1));

            i = closingIndex + 1;
        } else if (char === '<') {
            // Start of content
            const closingIndex = findClosingContentIndex(i);
            results.push(new Content(input.slice(i + 1, closingIndex)));

            i = closingIndex + 1;
        } else if (char === ',') {
            i += 1;
        } else {
            throw new Error(`Unexpected character: ${char}`);
        }
    }

    return results;

    function findClosingContentIndex(startingPoint) {
        let i = startingPoint + 1;
        let result = null;

        while (!result && i < length) {
            const char = input[i];

            if (char === '>') result = i;

            if (char === '!') i += 2;
            else i += 1;
        }

        return result;
    }

    function findClosingStreamIndex(startingPoint) {
        let count = 1;
        let i = startingPoint + 1;
        let result = null;
        let contentStarted = false;

        while (!result && i < length) {
            const char = input[i];

            if (!contentStarted && char === '}') count -= 1;
            else if (!contentStarted && char === '{') count += 1;
            else if (char === '<') contentStarted = true;
            else if (contentStarted && char === '>') contentStarted = false;

            if (count === 0) result = i;

            if (char === '!') i += 2;
            else i += 1;
        }

        return result;
    }

};

module.exports = Stream;