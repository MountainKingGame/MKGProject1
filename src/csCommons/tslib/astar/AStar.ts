
/**
 * A星寻路
 * @author chenkai
 * @see https://www.cnblogs.com/gamedaybyday/p/7778995.html
 * @since 2017/11/3
 */
namespace astars {
	export class AStar {
		public _grid: Grid;               //网格
		private _open: Node[];               //待考察表
		private _endNode: Node;                  //终点Node
		private _startNode: Node;                //起点Node
		private _path: Node[];               //结果路径
		//
		private _heuristic: Function;            //计算h的算法
		private _straightCost: number = 10;     //上下左右走的代价
		private _diagCost: number = 14;//Math.SQRT2;  //diagonal 斜着走的代价 

		private openMask:number = 0;
		private closeMask:number = 0;

		/**能否斜着走 */
		public canDiag: boolean = false;
		openListKind: OpenListKind = OpenListKind.ArraySort;
		searchCellKind: SearchCellKind = SearchCellKind.Normal;

		public debug_calculateCount: number;
		public debug_openCompareCount: number;


		public get path(): Node[] {
			return this._path;
		}

		public constructor() {
			this._heuristic = this.manhattan;
			// this._heuristic = this.euclidian;
			// this._heuristic = this.diagonal;
		}

		//寻路
		public findPath(): boolean {
			this.debug_calculateCount = 0;
			this.debug_openCompareCount = 0;

			this.openMask>99999999?this.openMask=1:this.openMask++;
			this.closeMask=this.openMask;

			this._open = [];

			this._startNode = this._grid.startNode;
			this._endNode = this._grid.endNode;

			this._startNode.g = 0;
			this._startNode.h = this._heuristic(this._startNode);
			this._startNode.f = this._startNode.g + this._startNode.h;

			return this.search();
		}
		//查找路径
		private search(): boolean {
			var node: Node = this._startNode;
			while (node != this._endNode) {
				let minFNode:Node = this.searchAround(node);
				// for (var o = 0; o < this._open.length; o++) {
				// }
				node.closeMask = this.closeMask;
				if (this._open.length == 0) {
					console.log("AStar >> no path found");
					return false;
				}
				if(minFNode!=null){
					node = minFNode;
				}else{
					this.sortOpenList();
					node.openMask = 0;
					node = this._open.pop() as Node;
				}
			}
			this.generateResultPath();
			return true;
		}

		private roundOffset8:IVector2[] = [{x:1,y:0},{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:-1,y:0},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1}];
		private roundOffset4:IVector2[] = [{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}];

		/**处理周围的格子 */
		private searchAround(node: Node) {
			let minFNode:Node;
			let roundOffset;
			if (this.canDiag) {
				roundOffset = this.roundOffset8;
			} else {
				roundOffset = this.roundOffset4;
			}
			for (var i = 0; i < roundOffset.length; i++) {
				this.debug_calculateCount++;
				let offset:IVector2 = roundOffset[i];
				var test: Node = this._grid.getNodeSafe(node.x+offset.x,node.y+offset.y);
				if (test==null || test == node ||
					!test.walkable ||
					!this._grid.getNode(node.x, test.y).walkable ||
					!this._grid.getNode(test.x, node.y).walkable) {
					continue;
				}

				var cost: number = this._straightCost;
				if (this.canDiag == true) {
					if (!((node.x == test.x) || (node.y == test.y))) {
						cost = this._diagCost;
					}
				}
				var g = node.g + cost * test.costMultiplier;
				var h = this._heuristic(test);
				var f = g + h;
				if (test.openMask==this.openMask || test.closeMask==this.closeMask) {
					if (test.f > f) {
						test.f = f;
						test.g = g;
						test.h = h;
						test.previous = node;
					}
				}
				else {
					test.f = f;
					test.g = g;
					test.h = h;
					test.previous = node;
					this.openListPush(test);
					switch(this.searchCellKind){
						case SearchCellKind.MinFAround:
						if(minFNode==null || test.f<minFNode.f){
							minFNode = test;
						}
						break;
					}
				}
			}
			return minFNode;
		}

		private openListPush(node: Node) {
			node.openMask = this.openMask;
			switch (this.openListKind) {
				case OpenListKind.BubbleSort:
				case OpenListKind.ArraySort:
					this._open.push(node);
					break;
				case OpenListKind.PushCompare:
					let openLen = this._open.length;
					if (openLen == 0) {
						this._open.push(node);
					} else {
						for (let i = openLen - 1; i >= 0; i--) {
							let temp = this._open[i];
							this.debug_openCompareCount++;
							if (node.f <= temp.f) {
								this._open.splice(i + 1, 0, node);
								return;
							}
						}
						//node最大,则放头里去
						this._open.unshift(node);
					}
					break;
			}
		}

		/**冒泡算法排序open列表,找到最小f(可以优化) */
		private sortOpenList() {
			switch (this.openListKind) {
				case OpenListKind.BubbleSort:
					if (this.openListKind == 1) {
						let openLen = this._open.length;
						for (let m = 0; m < openLen; m++) {
							for (let n = m + 1; n < openLen; n++) {
								this.debug_openCompareCount++;
								if (this._open[m].f < this._open[n].f) {
									let temp = this._open[m];
									this._open[m] = this._open[n];
									this._open[n] = temp;
								}
							}
						}
					}
					break;
				case OpenListKind.ArraySort:
					this._open.sort(this.arraySortCompare.bind(this));
					break;
			}
		}
		private arraySortCompare(a: Node, b: Node): number {
			this.debug_openCompareCount++;
			if (a.f < b.f) {
				return 1;
			} else if (a.f > b.f) {
				this.debug_openCompareCount++;
				return -1;
			}
			this.debug_openCompareCount++;
			return 0;
		}

		//声生成最终路径
		private generateResultPath(): void {
			this._path = new Array();
			var node: Node = this._endNode;
			this._path.push(node);
			while (node != this._startNode) {
				node = node.previous;
				this._path.unshift(node);
			}
		}

		//曼哈顿算法
		private manhattan(node: Node) {
			return (Math.abs(node.x - this._endNode.x) + Math.abs(node.y + this._endNode.y)) * this._straightCost;
		}


		private euclidian(node: Node) {
			var dx = node.x - this._endNode.x;
			var dy = node.y - this._endNode.y;
			return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
		}

		private diagonal(node: Node) {
			var dx = Math.abs(node.x - this._endNode.x);
			var dy = Math.abs(node.y - this._endNode.y);
			var diag = Math.min(dx, dy);
			var straight = dx + dy;
			return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
		}
	}
	export enum SearchCellKind {
		Normal = 1,
		MinFAround = 2,
	}
	export enum OpenListKind {
		/**冒泡排序 */
		BubbleSort = 1,
		/**push时普通排序 */
		PushCompare = 2,
		/**js默认的sort排序 */
		ArraySort = 3,
	}
}