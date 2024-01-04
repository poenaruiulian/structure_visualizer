class BinaryHeapHistory {
    static history: any[] = [];

    constructor() {
        this.history = [""]
    }
    static InsertedNode(value) {
        this.history.push("Inserted node " + value)
    }
    static DeletedNode(value) {
        this.history.push("Deleted node " + value)
    }

    static ExtractedMinim() {
        this.history.push("Extracted minim")
    }

    static DecreasedKey(pos){
        this.history.push("Decreased key on position " + pos)
    }

    static HeapifiedMin() {
        this.history.push("Heapified the tree")
    }

    static getHistory(){
        return this.history
    }

    static InsertBreak(){
        this.history.push("-");
    }
}

export default BinaryHeapHistory