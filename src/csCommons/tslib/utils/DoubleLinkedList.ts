/**
 * 双向链表 
 * 结构  null -> node -> .... -> node -> head
 * 顺序  prev -> prev -> node -> next -> next
*/
class DoubleLinkedList {
    public length: number = 0;
    public head: IDoubleLinkedListNode;

    push(node: IDoubleLinkedListNode) {
        if (node == null) {
            throw new Error("");
        }
        if (this.head == null) {
            this.head = node;
            this.head.prevNode = null;
            this.head.nextNode = null;
        } else {
            node.prevNode = this.head;
            this.head.nextNode = node;
            this.head = node;
        }
        this.length++;
    }
    insertNext(node: IDoubleLinkedListNode, old: IDoubleLinkedListNode) {
        node.prevNode = old;
        node.nextNode = old.nextNode;
        if (this.head == old) {
            this.head = node;
        } else {
            old.nextNode.prevNode = node;
        }
        old.nextNode = node;
        this.length++;
    }
    insertPrev(node: IDoubleLinkedListNode, old: IDoubleLinkedListNode) {
        node.nextNode = old;
        node.prevNode = old.prevNode;
        if(old.prevNode){
            old.prevNode.nextNode = node;
        }
        old.prevNode = node;
        this.length++;
    }
    remove(node: IDoubleLinkedListNode) {
        if (node.prevNode != null) {
            node.prevNode.nextNode = node.nextNode;
        }
        if (node.nextNode != null) {
            node.nextNode.prevNode = node.prevNode;
        }
        if (this.head == node) {
            this.head = node.prevNode;
        }
        node.nextNode = node.prevNode = null;
        this.length--;
    }
    pop(): IDoubleLinkedListNode {
        let node: IDoubleLinkedListNode = this.head;
        this.remove(this.head);
        return node;
    }
    getTail(): IDoubleLinkedListNode {
        if (this.head == null) {
            return null;
        }
        var currNode: IDoubleLinkedListNode = this.head;
        while (currNode.prevNode) {
            currNode = currNode.prevNode;
        }
        return currNode;
    }
    /**
     * 
     * @param clearNode 是否清理 node.next/prev
     */
    clear(clearNode: boolean) {
        if (clearNode) {
            if (this.head) {
                var currNode: IDoubleLinkedListNode = this.head;
                while (currNode) {
                    let t: IDoubleLinkedListNode = currNode;
                    currNode = currNode.prevNode;
                    t.nextNode = t.prevNode = null;
                }
            }
        }
        this.head = null;
        this.length = 0;
    }
}
/**双重链表节点 */
interface IDoubleLinkedListNode {
    nextNode: IDoubleLinkedListNode
    prevNode: IDoubleLinkedListNode;
}
