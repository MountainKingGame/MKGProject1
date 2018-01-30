/**
 * @author chenkai
 * @since 2017/11/3
 */
namespace astars{
	export interface INode extends IDoubleLinkedListNode {
		nextNode:IDoubleLinkedListNode
		prevNode:IDoubleLinkedListNode;
		x:number;    //列
		y:number;    //行
		f:number;    //代价 f = g+h
		g:number;    //起点到当前点代价
		h:number;    //当前点到终点估计代价
		costMultiplier:number;//cost倍数
		walkable:boolean;
		openMask:number;
		closeMask:number;
		previous:Node;
	}
	export class Node implements IDoubleLinkedListNode {
		static Word_f = "f";
		nextNode:IDoubleLinkedListNode
		prevNode:IDoubleLinkedListNode;

		public x:number;    //列
		public y:number;    //行
		public f:number;    //代价 f = g+h
		public g:number;    //起点到当前点代价
		public h:number;    //当前点到终点估计代价
		public costMultiplier:number = 1;//cost倍数
		public walkable:boolean = true;
		//
		public openMask:number = 0;
		public closeMask:number = 0;
		//
		public previous:Node;
	
		public constructor(x:number , y:number) {
			this.x = x;
			this.y = y;
		}
	}
}
