class Node {

    /**
     * Constructor for creating a root node out of many events
     * @param schedule is the array of HardEvent
     */
    constructor() {
        this.newEvent = null;
        this.parent = null;
        this.schedule = null;
        this.cumScore = 0;
        this.leftChild = null;
        this.rightChild = null;
    }

    /**
     * Create a node out of @param newEvent and @param score with @param parent
     */
    constructWithParent(newEvent, score, parent) {
        this.newEvent = newEvent;
        this.parent = parent;
        this.schedule = this.parent.schedule.slice(0);
        this.schedule.push(this.newEvent);
        this.cumScore = this.parent.score + score;
        this.leftChild = null;
        this.rightChild = null;
        return this;
    }

    /**
     * Constructor for root node with array of hard events as schedule
     */
    construcWithArray(schedule) {
        this.schedule = schedule;
        return this
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

module.exports = {
  Tree : Tree,
  Node : Node
}
