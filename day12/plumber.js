class NodeList {
    constructor() {
        this.nodes = {};
    }

    addNode(pid, cids) {
        if (!this.nodes[pid]) this.nodes[pid] = new Node(pid, cids);

        cids.forEach((cid) => {
            if (!this.nodes[cid]) this.nodes[cid] = new Node(cid, [pid]);
            else this.nodes[cid].addConnection(pid);
        });
    }

    getNode(pid) {
        return this.nodes[pid];
    }

    countConnectionsTo(pid) {
        return Object.keys(this.nodes).map((key) => this.nodes[key]).reduce((count, node) => {
            if (node.hasConnection(pid, this)) count += 1;
            return count;
        }, 0);
    }
}

class Node {
    constructor(pid, cids = []) {
        this.pid = pid;
        this.cids = cids;

        this.farConnections = {};
    }

    addConnection(cid) {
        this.cids.push(cid);
    }

    hasConnection(pid, nodeList, visitedNodes = []) {
        if (!this.farConnections[pid]) {

            if (this.pid === pid) {
                this.farConnections[pid] = true;
            } else if (visitedNodes.includes(this.pid)) {
                this.farConnections[pid] = false;
            } else {
                const directConnection = this.cids.includes(pid);
                const otherConnection = this.cids.some((cid) => nodeList
                    .getNode(cid)
                    .hasConnection(pid, nodeList, [this.pid, ...visitedNodes])
                );
                this.farConnections[pid] = directConnection || otherConnection;
            }

        }

        return this.farConnections[pid];
    }
}

function parseLine(/**string*/ line) {
    const [pid, connectionString] = line.split(' <-> ');
    const cids = connectionString.split(', ');

    return {
        pid: parseInt(pid, 10),
        cids: cids.map((cid) => parseInt(cid, 10))
    };
}

function parseInput(/**string*/ input) {
    const nodeList = new NodeList();

    input
        .split('\n')
        .map(parseLine)
        .forEach(({ pid, cids }) => nodeList.addNode(pid, cids));

    return nodeList;
}

module.exports = { parseInput };