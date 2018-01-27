interface IDispose {
	// addDisposeHandler(callback):void;
	// removeDisposeHandler(callback):void;
	dispose():void;
}
interface IVector2{
    x?:number;
    y?:number;
}
interface IGrid{
    col?:number;
    row?:number;
}
/**双重链表节点 */
interface IDoubleLinkedListNode{
    preNode:IDoubleLinkedListNode;
    nextNode:IDoubleLinkedListNode;
}