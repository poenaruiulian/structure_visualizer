// For the implementation I took inspiration from https://www.geeksforgeeks.org/binary-heap/ and verified the formulas
// using the materials taught at ASD2

import BinaryHeapHistory from "../helpers/BinaryHeapHistory";

class BinaryHeap {
    static arr: any[] = [];

    constructor() {
        this.arr = [];
    }

    static left(i) {
        return 2 * i + 1;
    }

    static right(i) {
        return 2 * i + 2;
    }

    static parent(i) {
        return Math.floor((i - 1) / 2)
    }

    static getMin() {
        return this.arr[0]
    }

    static insert(k) {
        BinaryHeapHistory.InsertedNode(k)
        let arr = this.arr;
        arr.push(k);

        let i = arr.length - 1;
        while (i > 0 && arr[this.parent(i)] > arr[i]) {
            let p = this.parent(i);
            [arr[i], arr[p]] = [arr[p], arr[i]];
            i = p;
        }
    }

    static decreaseKey(i, new_val) {
        BinaryHeapHistory.DecreasedKey(i)
        let arr = this.arr;
        arr[i] = new_val;

        while (i !== 0 && arr[this.parent(i)] > arr[i]) {
            let p = this.parent(i);
            [arr[i], arr[p]] = [arr[p], arr[i]];
            i = p;
        }
    }

    static extractMin() {
        BinaryHeapHistory.ExtractedMinim()
        let arr = this.arr;
        if (arr.length == 1) {
            return arr.pop();
        }

        let res = arr[0];
        arr[0] = arr[arr.length - 1];
        arr.pop();
        BinaryHeapHistory.HeapifiedMin()
        this.MinHeapify(0);
        return res;
    }


    static deleteKey(i) {
        BinaryHeapHistory.DeletedNode(this.getArr()[i])
        this.decreaseKey(i, this.arr[0] - 1);
        this.extractMin();
    }

    static MinHeapify(i) {
        let arr = this.arr;
        let n = arr.length;
        if (n === 1) {
            return;
        }
        let l = this.left(i);
        let r = this.right(i);
        let smallest = i;
        if (l < n && arr[l] < arr[i])
            smallest = l;
        if (r < n && arr[r] < arr[smallest])
            smallest = r;
        if (smallest !== i) {
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]]
            this.MinHeapify(smallest);
        }
    }

    static getArr() {
        return this.arr
    }

    static transformHeapToBinaryTree() {

        let heapArray = this.arr
        const buildNode = (index) => {
            if (index >= heapArray.length) return null;

            const node = {
                name: String(heapArray[index]),
                attributes: {
                    color: index === 0 ? "#F6B17A" : "#365486",
                },
                children: [],
            };

            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            // Add left child if within heap boundaries
            if (leftChildIndex < heapArray.length) {
                const leftChild = buildNode(leftChildIndex);
                if (leftChild) {
                    node.children.push(leftChild);
                }
            }

            // Add right child if within heap boundaries
            if (rightChildIndex < heapArray.length) {
                const rightChild = buildNode(rightChildIndex);
                if (rightChild) {
                    node.children.push(rightChild);
                }
            }

            return node;
        };

        return buildNode(0);
    }
}

export default BinaryHeap;
