/**
 * 网格类
 * @author chenkai
 * @since 2017/11/3
 */
namespace astars{
	export  class Grid {
		nodes:INode[][];  //Node数组 [col][row]
		colLen:number;    //网格行列
		rowLen:number;

		public constructor(colLen:number, rowLen:number) {
			this.colLen = colLen;
			this.rowLen = rowLen;
			this.nodes = [];

			for(let i:number=0;i<colLen;i++){
				this.nodes[i] = [];
				for(let j:number=0;j<rowLen;j++){
					this.nodes[i][j] = new Node(i,j);
				}
			}
		}

		public getNodeSafe(x:number , y:number):INode{
			if(this.nodes[x]){
				return this.nodes[x][y];
			}
			return undefined;
		}

		public setWalkable(x:number, y:number, walkable:boolean){
			this.nodes[x][y].walkable = walkable;
		}
		public setCostMultiplier(x:number, y:number, val:number){
			this.nodes[x][y].costMultiplier = val;
		}

	}
}
