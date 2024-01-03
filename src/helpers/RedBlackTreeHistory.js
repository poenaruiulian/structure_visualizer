class RedBlackTreeHistory {
    static history: any[] = [];
    constructor() {
        this.history = ["qsda"]
    }
    static InsertedNode(value) {
        this.history.push("Inserted node " + value)
    }
    static DeletedNode(value) {
        this.history.push("Deleted node " + value)
    }
    static RotatedLeftNode(value){
        this.history.push("Rotated left node " + value)
    }
    static RotatedRightNode(value){
        this.history.push("Rotated right node " + value)
    }
    static DeleteFixupMade(value){
        this.history.push("Delete fixup made at node " + value)
    }
    static InsertFixupMade(value){
        this.history.push("Insert fixup made at node " + value)
    }
    static getHistory(){
        return this.history
    }
    static InsertBreak(){
        this.history.push("-");
    }
}

export default RedBlackTreeHistory