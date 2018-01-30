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

		public init(nodes:INode[][]) {
			this.colLen = nodes.length;
			this.rowLen = nodes[0].length;
			this.nodes = nodes;
		}

		public getNodeSafe(x:number , y:number):INode{
			if(this.nodes[x]){
				return this.nodes[x][y];
			}
			return undefined;
		}

	}
}
