class EdgeIndex {
    constructor(edge, index, quadraticIndex) {
        this.edge = edge;
        this.index = index;
        this.quadraticIndex = quadraticIndex;
    }

    isCorner() {
        return this.index === this.quadraticIndex;
    }

    isFirst() {
        return this.index === 0;
    }

    isPreviousLast() {
        return this.edge === 3 && this.index === (this.quadraticIndex - 1);
    }

    previous() {
        if (this.index === 0) {
            const previousEdge = (this.edge + 4 - 1) % 4;

            return new EdgeIndex(previousEdge, this.quadraticIndex, this.quadraticIndex);
        } else {
            return new EdgeIndex(this.edge, this.index - 1, this.quadraticIndex);
        }
    }

    next() {
        if (this.isCorner()) {
            const nextEdge = (this.edge + 1) % 4;

            return new EdgeIndex(nextEdge, 0, this.quadraticIndex);
        } else {
            return new EdgeIndex(this.edge, this.index + 1, this.quadraticIndex);
        }
    }

    innerAdjecentCorner() {
        if (this.quadraticIndex === 1) return EdgeIndex.FIRST;

        const quadraticIndex = this.quadraticIndex - 2;
        return new EdgeIndex(this.edge, quadraticIndex, quadraticIndex);
    }

    innerAdjecentEdge() {
        if (this.quadraticIndex === 1) return EdgeIndex.FIRST;

        let index;
        let edge;
        const quadraticIndex = this.quadraticIndex - 2;
        if (this.isFirst()) {
            index = quadraticIndex;
            edge = (this.edge + 4 - 1) % 4;
        } else {
            index = this.index - 1;
            edge = this.edge;
        }

        return new EdgeIndex(edge, index, quadraticIndex);
    }

    getRealIndex() {
        if (this.edge === null) return 1;
        return (this.quadraticIndex) ** 2
            + (this.edge * (this.quadraticIndex + 1))
            + this.index
            + 1;
    }

    isBefore(other) {
        return other.getRealIndex() < this.getRealIndex();
    }
}

EdgeIndex.FIRST = new EdgeIndex(null, null, null);

module.exports = EdgeIndex;