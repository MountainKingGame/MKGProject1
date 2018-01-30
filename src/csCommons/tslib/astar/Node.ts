/**
 * @author chenkai
 * @since 2017/11/3
 */
namespace astars{
	export interface INode extends IDoubleLinkedListNode {
		nextNode:IDoubleLinkedListNode
		prevNode:IDoubleLinkedListNode;

		col:number;    //列
		row:number;    //行
		f:number;    //代价 f = g+h
		g:number;    //起点到当前点代价
		h:number;    //当前点到终点估计代价
		costMultiplier:number;//cost倍数
		walkable:boolean;
		openMask:number;
		closeMask:number;
		previous:INode;
	}
	export class Node implements INode {
		nextNode:IDoubleLinkedListNode
		prevNode:IDoubleLinkedListNode;
		//
		public col:number;    //列
		public row:number;    //行
		//
		public f:number;    //代价 f = g+h
		public g:number;    //起点到当前点代价
		public h:number;    //当前点到终点估计代价
		public costMultiplier:number = 10;//cost倍数 用10比用1好,便于用int
		public walkable:boolean = true;
		//
		public openMask:number = 0;
		public closeMask:number = 0;
		//
		public previous:INode;
	
		public constructor(col:number , row:number) {
			this.col = col;
			this.row = row;
		}

		public static newNodes(colLen:number,rowLen:number):INode[][]{
			let nodes:INode[][] = [];
			for(let i:number=0;i<colLen;i++){
				nodes[i] = [];
				for(let j:number=0;j<rowLen;j++){
					nodes[i][j] = new Node(i,j);
				}
			}
			return nodes;
		}
	}
}
