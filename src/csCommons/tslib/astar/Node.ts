/**
 * @author chenkai
 * @since 2017/11/3
 */
namespace astars{
	export class Node {
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
