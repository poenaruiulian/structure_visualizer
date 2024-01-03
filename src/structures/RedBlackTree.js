// For the delete method I've used https://www.sahinarslan.tech/posts/deep-dive-into-data-structures-using-javascript-red-black-tree
// because something did not go accordingly with the algorithm from the course
// It should be something about the fact that the algorithm from course takes null as being BLACK color, thing
// I've bypassed it on insertion

import RedBlackTreeHistory from "../helpers/RedBlackTreeHistory";

const NodeColor = {
    RED: '#FA7070',
    BLACK: '#040D12',
}

class RBTNode {
    constructor(value, parent = null) {
        this.value = value
        this.left = null
        this.right = null
        this.parent = parent
        this.color = NodeColor.RED
    }
}

class RedBlackTree {
    constructor() {
        this.root = null
    }

    static NodeInTree(value) {
        let current = new RBTNode(-1)
        current = this.root
        while (current !== null && current !== undefined) {
            if (current.value === value) {
                return true
            } else if (value < current.value) {
                current = current.left
            } else {
                current = current.right
            }
        }
        return false
    }

    static SearchNode(value, node = this.root) {
        if (!node) {
            return false
        }
        if (value === node.value) {
            return node
        }
        if (value < node.value) {
            return this.SearchNode(value, node.left)
        }
        return this.SearchNode(value, node.right)
    }

    static LeftRotate(xNode) {
        RedBlackTreeHistory.RotatedLeftNode(xNode.value)
        let yNode = xNode.right
        xNode.right = yNode.left
        if (yNode.left !== null) {
            yNode.left.parent = xNode
        }
        yNode.parent = xNode.parent
        if (xNode.parent === null) {
            this.root = yNode
        } else if (xNode === xNode.parent.left) {
            xNode.parent.left = yNode
        } else {
            xNode.parent.right = yNode
        }
        yNode.left = xNode
        xNode.parent = yNode
    }

    static RightRotate(xNode) {
        RedBlackTreeHistory.RotatedRightNode(xNode.value)
        let yNode = xNode.left
        xNode.left = yNode.right
        if (yNode.right !== null) {
            yNode.right.parent = xNode
        }
        yNode.parent = xNode.parent
        if (xNode.parent === null) {
            this.root = yNode
        } else if (xNode === xNode.parent.right) {
            xNode.parent.right = yNode
        } else {
            xNode.parent.left = yNode
        }
        yNode.right = xNode
        xNode.parent = yNode
    }

    static RBInsertFixup(zNode) {
        if (zNode.parent !== null && zNode.parent.color === NodeColor.RED) {
            RedBlackTreeHistory.InsertFixupMade(zNode.value)
        }
        while (zNode.parent !== null && zNode.parent.color === NodeColor.RED) {
            if (zNode.parent === zNode.parent.parent.left) {
                let yNode = zNode.parent.parent.right
                if (yNode !== null && yNode.color === NodeColor.RED) {
                    zNode.parent.color = NodeColor.BLACK
                    yNode.color = NodeColor.BLACK
                    zNode.parent.parent.color = NodeColor.RED
                    zNode = zNode.parent.parent
                } else if (zNode === zNode.parent.right) {
                    zNode = zNode.parent
                    this.LeftRotate(zNode)
                } else {
                    zNode.parent.color = NodeColor.BLACK
                    zNode.parent.parent.color = NodeColor.RED

                    this.RightRotate(zNode.parent.parent)
                }
            } else {
                let yNode = zNode.parent.parent.left
                if (yNode !== null && yNode.color === NodeColor.RED) {
                    zNode.parent.color = NodeColor.BLACK
                    yNode.color = NodeColor.BLACK
                    zNode.parent.parent.color = NodeColor.RED
                    zNode = zNode.parent.parent
                } else if (zNode === zNode.parent.left) {
                    zNode = zNode.parent
                    this.RightRotate(zNode)
                } else {
                    zNode.parent.color = NodeColor.BLACK
                    zNode.parent.parent.color = NodeColor.RED
                    this.LeftRotate(zNode.parent.parent)
                }
            }
        }
        this.root.color = NodeColor.BLACK
    }

    static RBInsert(value) {
        if (!this.NodeInTree(value)) {
            RedBlackTreeHistory.InsertedNode(value)
            let zNode = new RBTNode(value)
            let yNode = null;
            let xNode = new RBTNode(value)
            xNode = this.root

            while (xNode !== null && xNode !== undefined) {
                yNode = xNode;
                if (zNode.value < xNode.value) {
                    xNode = xNode.left
                } else {
                    xNode = xNode.right
                }
            }
            zNode.parent = yNode
            if (yNode === null) {
                this.root = zNode
            } else if (zNode.value < yNode.value) {
                yNode.left = zNode
            } else {
                yNode.right = zNode
            }

            zNode.left = null
            zNode.right = null
            zNode.color = NodeColor.RED
            this.RBInsertFixup(zNode)
        }
    }

    // static RBDeleteFixup(xNode) {
    //     while (xNode !== this.root && xNode.color === NodeColor.BLACK) {
    //         if (xNode === xNode.parent.left) {
    //             let wNode = xNode.parent.right
    //             if (wNode.color === NodeColor.RED) {
    //                 wNode.color = NodeColor.BLACK
    //                 xNode.parent.color = NodeColor.RED
    //                 this.LeftRotate(xNode.parent)
    //                 wNode = xNode.parent.right
    //             }
    //             if (wNode.left.color === NodeColor.BLACK && wNode.right.color === NodeColor.BLACK) {
    //                 wNode.color = NodeColor.RED
    //                 xNode = xNode.parent
    //             } else if (wNode.left.color === NodeColor.BLACK) {
    //                 wNode.left.color = NodeColor.BLACK
    //                 wNode.color = NodeColor.RED
    //                 this.RightRotate(wNode)
    //                 wNode = xNode.parent.right
    //             } else {
    //                 wNode.color = xNode.parent.color
    //                 xNode.parent.color = NodeColor.BLACK
    //                 wNode.right.color = NodeColor.BLACK
    //                 this.LeftRotate(xNode.parent)
    //                 xNode = this.root
    //             }
    //         } else {
    //             let wNode = xNode.parent.left
    //             if (wNode.color === NodeColor.RED) {
    //                 wNode.color = NodeColor.BLACK
    //                 xNode.parent.color = NodeColor.RED
    //                 this.RightRotate(xNode.parent)
    //                 wNode = xNode.parent.left
    //             }
    //             if (wNode.left.color === NodeColor.BLACK && wNode.right.color === NodeColor.BLACK) {
    //                 wNode.color = NodeColor.RED
    //                 xNode = xNode.parent
    //             } else if (wNode.right.color === NodeColor.BLACK) {
    //                 wNode.right.color = NodeColor.BLACK
    //                 wNode.color = NodeColor.RED
    //                 this.LeftRotate(wNode)
    //                 wNode = xNode.parent.left
    //             } else {
    //                 wNode.color = xNode.parent.color
    //                 xNode.parent.color = NodeColor.BLACK
    //                 wNode.left.color = NodeColor.BLACK
    //                 this.RightRotate(xNode.parent)
    //                 xNode = this.root
    //             }
    //         }
    //     }
    // }

    static Minimum(wNode) {
        let xNode = wNode
        while (xNode.left !== null) {
            xNode = xNode.left
        }
        return xNode
    }

    // static Successor(wNode) {
    //     if (wNode === null) {
    //         return wNode
    //     }
    //     let xNode = wNode
    //     if (xNode.right !== null) {
    //         return this.Minimum(xNode.right)
    //     }
    //     let yNode = xNode.parent
    //     while (yNode !== null && xNode == yNode.right) {
    //         xNode = yNode
    //         yNode = xNode.parent
    //     }
    //     return yNode
    // }

    // static RBDelete(value) {
    //     if (this.NodeInTree(value)) {
    //         let zNode = this.SearchNode(value)
    //         let yNode = null;
    //         if (zNode.left === null || zNode.right === null) {
    //             yNode = zNode
    //         } else {
    //             yNode = this.Successor(zNode)
    //         }
    //         let xNode = null;
    //         if (yNode.left === null) {
    //             xNode = yNode.left;
    //         } else {
    //             xNode = yNode.right;
    //         }
    //         if (xNode !== null) {
    //             xNode.parent = yNode.parent
    //         }
    //         if (yNode.parent === null) {
    //             this.root = xNode
    //         } else if (yNode === yNode.parent.left) {
    //             yNode.parent.left = xNode
    //         } else {
    //             yNode.parent.right = zNode
    //         }
    //         if (yNode !== zNode) {
    //             zNode.value = yNode.value
    //         }
    //         if (yNode.color === NodeColor.BLACK) {
    //             this.RBDeleteFixup(xNode)
    //         }
    //     }
    // }

    static ReplaceParent(currNode, newNode) {
        const {parent} = currNode
        if (!parent) {
            this.root = newNode
        } else if (currNode === parent.left) {
            parent.left = newNode
        } else {
            parent.right = newNode
        }
    }

    static IsRed(node) {
        return node ? node.color === NodeColor.RED : false
    }

    static RBDelete(value, node = this.root) {
        const targetNode = this.SearchNode(value, node)

        if (!targetNode) {
            return false
        }

        if (!targetNode.left && !targetNode.right) {
            if (this.IsRed(targetNode)) {
                this.ReplaceParent(targetNode, null)
            } else {
                this.RBDeleteFixup(targetNode)
                this.ReplaceParent(targetNode, null)
            }
        } else if (!targetNode.left || !targetNode.right) {
            if (targetNode.left) {
                targetNode.left.color = NodeColor.BLACK
                targetNode.left.parent = targetNode.parent
                this.ReplaceParent(targetNode, targetNode.left)
            } else {
                targetNode.right.color = NodeColor.BLACK
                targetNode.right.parent = targetNode.parent
                this.ReplaceParent(targetNode, targetNode.right)
            }
        } else {
            const aux = this.Minimum(targetNode.right)
            targetNode.value = aux.value
            this.RBDelete(aux.value, targetNode.right)
        }
        return this.root
    }

    static RBDeleteFixup(node) {
        let currNode = node

        RedBlackTreeHistory.DeleteFixupMade(node.value)

        while (currNode !== this.root && !this.IsRed(currNode)) {
            const {parent} = currNode
            let sibling

            if (currNode === parent.left) {
                sibling = parent.right

                if (this.IsRed(sibling)) {
                    this.LeftRotate(parent)
                } else if (!this.IsRed(sibling.left) && !this.IsRed(sibling.right)) {
                    // If 'parent' is red
                    if (this.IsRed(parent)) {
                        parent.color = NodeColor.BLACK
                        sibling.color = NodeColor.RED
                        break
                    }
                    sibling.color = NodeColor.RED
                    currNode = parent
                } else if (this.IsRed(sibling.left) && !this.IsRed(sibling.right)) {
                    this.RightRotate(sibling)
                } else {
                    this.LeftRotate(parent)
                    parent.color = NodeColor.BLACK
                    sibling.right.color = NodeColor.BLACK
                    break
                }
            } else {
                sibling = parent.left
                if (this.IsRed(sibling)) {
                    this.RightRotate(parent)
                } else if (!this.IsRed(sibling.left) && !this.IsRed(sibling.right)) {
                    if (this.IsRed(parent)) {
                        parent.color = NodeColor.BLACK
                        sibling.color = NodeColor.RED
                        break
                    }
                    sibling.color = NodeColor.RED
                    currNode = parent
                } else if (this.IsRed(sibling.right) && !this.IsRed(sibling.left)) {
                    this.LeftRotate(sibling)
                } else {
                    this.RightRotate(parent)
                    parent.color = NodeColor.BLACK
                    sibling.left.color = NodeColor.BLACK
                    break
                }
            }
        }
    }

    static levelOrderTraversal() {
        // Create an empty array to store the traversed nodes
        const temp = []
        // Create an array to keep track of the current level of nodes
        const queue = []

        // If the tree has a root, add it to the queue
        if (this.root) {
            queue.push(this.root)
        }

        // Keep traversing the tree while there are nodes in the queue
        while (queue.length) {
            // Create an array to store the nodes of the current level
            const subTemp = []
            // Store the number of nodes in the current level
            const len = queue.length

            // Iterate through the current level of nodes
            for (let i = 0; i < len; i += 1) {
                // Dequeue the first node in the queue
                const node = queue.shift()
                // Push the node's value to the subTemp array
                subTemp.push({
                    value: node.value,
                    color: node.color,
                    parent: node.parent == null ? -1 : node.parent.value
                })
                // If the node has a left child, add it to the queue
                if (node.left) {
                    queue.push(node.left)
                }
                // If the node has a right child, add it to the queue
                if (node.right) {
                    queue.push(node.right)
                }
            }

            // Push the subTemp array to the temp array
            temp.push(subTemp)
        }
        // Return the final temp array
        return temp
    }

    static transformTree() {
        let nodes = this.levelOrderTraversal()
        const getNodeByValue = (value) => nodes.flat().find((node) => node.value === value);

        const buildNode = (nodeValue) => {
            const node = getNodeByValue(nodeValue);
            if (!node) return null;

            const children = nodes.find((level) => level.some((n) => n.parent === node.value));
            const nodeChildren = children ? children.filter((n) => n.parent === node.value) : [];

            return {
                name: String(node.value),
                attributes: {
                    color: node.color,
                },
                children: nodeChildren.map((child) => buildNode(child.value)),
            };
        };

        const root = nodes.flat().find((node) => node.parent === -1);

        const result = root !== undefined ? buildNode(root.value) : undefined;

        return result;
    }

}

export default RedBlackTree