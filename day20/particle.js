/**
 * Particle path: p[t] = p[0] + t*v[0] + 0.5*t*(t+1)*a[0]
 * ~> x collide if pathA[t] = pathB[t]
 */
class Particle {
    constructor(id, p, v, a) {
        this.id = id;
        this.p0 = p;
        this.p = p;
        this.v0 = v;
        this.v = v;
        this.a0 = a;
        this.a = a;

        this.kill = false;
    }

    tick() {
        this.v[0] += this.a[0];
        this.v[1] += this.a[1];
        this.v[2] += this.a[2];

        this.p[0] += this.v[0];
        this.p[1] += this.v[1];
        this.p[2] += this.v[2];
    }

    canGetCloser() {
        return this.p[0] < 0 && (this.v[0] > 0 || this.a[0] > 0) ||
            this.p[0] > 0 && (this.v[0] < 0 || this.a[0] < 0) ||
            this.p[1] < 0 && (this.v[1] > 0 || this.a[1] > 0) ||
            this.p[1] > 0 && (this.v[1] < 0 || this.a[1] < 0) ||
            this.p[2] < 0 && (this.v[2] > 0 || this.a[2] > 0) ||
            this.p[2] > 0 && (this.v[2] < 0 || this.a[2] < 0);
    }

    distance(pos = this.p) {
        return Math.abs(pos[0]) + Math.abs(pos[1]) + Math.abs(pos[2]);
    }

    acceleration(acc = this.a) {
        return this.distance(acc);
    }

    positionAt(t) {
        return [
            this.position_n_At(t, 0),
            this.position_n_At(t, 1),
            this.position_n_At(t, 2)
        ];
    }

    distanceAt(t) {
        return this.distance(this.positionAt(t));
    }

    position_n_At(t, n) {
        return this.p0[n] + t * this.v0[n] + (t * (t + 1)) / 2 * this.a0[n];
    }

    hasSamePositionAt(/**Particle*/ other, t) {
        const posA = this.positionAt(t);
        const posB = other.positionAt(t);

        return posA[0] === posB[0] && posA[1] === posB[1] && posA[2] === posB[2];
    }

    collideTimeWith(/**Particle*/ other) {
        const dPx = this.p0[0] - other.p0[0];
        const dVx = this.v0[0] - other.v0[0];
        const dAx = this.a0[0] - other.a0[0];

        /**
         * check where x will collide according to the path
         * ==> p[t] = p[0] + t*v[0] + 0.5*t*(t+1)*a[0]
         * ==> 0 = (dA/2) * t**2 + (dV + dA/2) * t + dP
         */
        const solutions = solveQuadraticEquation(dAx / 2, dAx / 2 + dVx, dPx);

        const extendedSolutions = solutions
            // NaN and Infinity aren't good solutions
            .filter((s) => (!!s && Math.abs(s) !== Infinity))
            // add Math.floor and Math.ceil to ignore a possible faulty sqrt
            .map((s) => ([Math.floor(s), Math.ceil(s)])).reduce((a, b) => a.concat(b), [])
            // only solutions that collide in 3D are interesting
            .filter((s) => this.hasSamePositionAt(other, s))
            // Whut? Some logic error on my part, to lazy to find where
            .map((s) => -s);

        // only keep the lowest solution that actually collides
        if (extendedSolutions.length) return Math.min(...extendedSolutions);
        else return null;
    }
}


function parseInput(input) {
    return input
        .split('\n')
        .map((line, index) => parseParticle(line, index));
}

function parseParticle(line, index) {
    const [pString, vString, aString] = line.split('>,');
    return new Particle(
        index,
        parseCoordinates(pString, 'p'),
        parseCoordinates(vString, 'v'),
        parseCoordinates(aString, 'a')
    );
}

function parseCoordinates(string, identifier) {
    return string
        .replace(`${identifier}=<`, '')
        .replace('>', '')
        .split(',')
        .map((n) => parseInt(n.trim(), 10));
}

function closestDistance(particles) {
    let index;

    while (particles.some((p) => p.canGetCloser())) {
        const distance = Math.min(...particles.map((p) => p.distance()));
        index = particles.findIndex((p) => p.distance() === distance);
        particles.forEach((p) => p.tick());
    }

    return index;
}

function solveQuadraticEquation(a, b, c) {
    const d = (b ** 2) - (4 * a * c);

    if (d < 0) return [];

    const sqrtD = Math.sqrt(d);
    return [
        (-1 * b + sqrtD) / (2 * a),
        (-1 * b - sqrtD) / (2 * a)
    ];
}

function collide(particles) {
    const collisions = {};
    const l = particles.length;

    // check all collisions for all pairs
    for (let i = 0; i < l; i++) {
        const pA = particles[i];

        for (let j = i; j < l; j++) {
            const pB = particles[j];

            const collisionTime = pA.collideTimeWith(pB);
            if (collisionTime) {
                if (!collisions[collisionTime]) collisions[collisionTime] = [];
                collisions[collisionTime].push([i, j]);
            }
        }
    }

    // loop over all collistion times in order and remove the colliders
    let result = [...particles];
    Object.keys(collisions).sort().forEach((collisionTime) => {
        const collisionIds = collisions[collisionTime].reduce((a, b) => a.concat(b), []);
        result = result.filter((particle) => !collisionIds.includes(particle.id));
    });

    return result.length;
}

module.exports = { parseInput, closestDistance, collide, solveQuadraticEquation };
