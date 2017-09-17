class Node {
    /**
     * Create a node out of @param newEvent and @param score with @param parent
     */
    constructor(newEvent, score, parent) {
        this.newEvent = newEvent;
        this.parent = parent;
        this.schedule = this.parent.schedule.push(this.newEvent);
        this.cumScore = this.parent.score + score;
        this.leftChild = null;
        this.rightChild = null;
    }

    /**
     * Constructor for creating a root node (no parent)
     * with value @param newEvent and @param score as its cumScore
     */
    constructor(newEvent) {
        this.parent = null;
        this.schedule = [this.newEvent];
        this.cumScore = 0;
        this.leftChild = null;
        this.rightChild = null;
    }

    /**
     * Constructor for creating a root node out of many events
     * @param schedule is the array of HardEvent
     */
    constructor(schedule) {
        this.parent = null;
        this.schedule = schedule;
        this.cumScore = 0;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    /**
     * Create a new tree with a root node made out of @param newEvent and @param score
     */
    constructor(node) {
        this._root = node;
    }

    /**
     * Insert a node into the tree with a parent @param parentNode
     */
    insertNode(node, parentNode) {
        if (parentNode.leftChild !== null && parentNode.rightChild !== null) {
            throw "Node is full, can't add new child!"
        } else if (parentNode.leftChild == null) {
            parentNode.leftChild = node;
        } else {
            parentNode.rightChild = node;
        }
    }
}
