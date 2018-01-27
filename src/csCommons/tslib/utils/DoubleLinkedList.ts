/**双向链表 */
class DoubleLinkedList{
    public length:number = 0;
    public head:IDoubleLinkedListNode;

    push(node:IDoubleLinkedListNode){
        if(node==null){
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
    /* insertPrev(node:IDoubleLinkedListNode,old:IDoubleLinkedListNode){
        if(node==null){
            throw new Error("");
        }
        node.nextNode = old;
        node.prevNode = old.prevNode;
        this.length++;
    } */
    insertNext(node:IDoubleLinkedListNode,old:IDoubleLinkedListNode){
        if(node==null){
            throw new Error("");
        }
        node.prevNode = old;
        node.nextNode = old.nextNode;
        if(this.head==old){
            this.head = node;
        }else{
            old.nextNode.prevNode=node;
        }
        old.nextNode = node;
        this.length++;
    }
    unshift(node:IDoubleLinkedListNode){
        if(node==null){
            throw new Error("");
        }
        if(this.head==null){
            this.push(node);
        }else{
            var tail:IDoubleLinkedListNode = this.getTail();
            node.nextNode = tail;
            node.prevNode = null;
            tail.prevNode = node;
            this.length++;
        }
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
    pop():IDoubleLinkedListNode{
        let node:IDoubleLinkedListNode = this.head;
        this.remove(this.head);
        return node;
    }
    getTail():IDoubleLinkedListNode{
        if(this.head==null){
            return null;
        }
        var currNode:IDoubleLinkedListNode = this.head;
        while(currNode.prevNode){
            currNode = currNode.prevNode;
        }
        return currNode;
    }
    clear(){
        if(this.head){
            var currNode:IDoubleLinkedListNode = this.head;
            while(currNode){
                let t:IDoubleLinkedListNode = currNode;
                currNode = currNode.prevNode;
                t.nextNode = t.prevNode = null;
            }
            this.head = null;
            this.length = 0;
        }
    }
}
/**双重链表节点 */
interface IDoubleLinkedListNode{
    nextNode:IDoubleLinkedListNode
    prevNode:IDoubleLinkedListNode;
}
