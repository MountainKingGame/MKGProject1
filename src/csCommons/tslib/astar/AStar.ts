
/**
 * A星寻路
 * @author chenkai
 * @see https://www.cnblogs.com/gamedaybyday/p/7778995.html
 * @since 2017/11/3
 */
namespace astar {
	export class AStar {
		public _grid: astar.Grid;               //网格
		private _open: Node[];               //待考察表
		private _closed: Node[];             //已考察表
		private _endNode: Node;                  //终点Node
		private _startNode: Node;                //起点Node
		private _path: Node[];               //结果路径
		//
		private _heuristic: Function;            //计算h的算法
		private _straightCost: number = 10;     //上下左右走的代价
		private _diagCost: number = 14;//Math.SQRT2;  //diagonal 斜着走的代价 

		public calculateCount: number = 0;
		/**能否斜着走 */
		public canDiag: boolean = false;

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
			this.calculateCount = 0;

			this._open = [];
			this._closed = [];

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
				//-计算周围的8格
				var startX = Math.max(0, node.x - 1);
				var endX = Math.min(this._grid.numCols - 1, node.x + 1);
				var startY = Math.max(0, node.y - 1);
				var endY = Math.min(this._grid.numRows - 1, node.y + 1);
				//-
				for (var i = startX; i <= endX; i++) {
					for (var j = startY; j <= endY; j++) {
						if (this.canDiag == false) {
							//不让斜着走
							if (i != node.x && j != node.y) {
								continue;
							}
						}
						this.calculateCount++;
						//
						var test: Node = this._grid.getNode(i, j);
						if (test == node ||
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
						if (this.isOpen(test) || this.isClosed(test)) {
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
						}
					}
				}
				// for (var o = 0; o < this._open.length; o++) {
				// }
				this._closed.push(node);
				if (this._open.length == 0) {
					console.log("AStar >> no path found");
					return false;
				}
				this.sortOpenList();
				node = this._open.pop() as Node;
			}
			this.generateResultPath();
			return true;
		}

		openListKind: number = 2;
		private openListPush(node: Node) {
			if (this.openListKind == 1) {
				this._open.push(node);
			} else {
				let openLen = this._open.length;
				if (openLen == 0) {
					this._open.push(node);
				} else {
					for (let i = openLen - 1; i >= 0; i--) {
						let temp = this._open[i];
						if (node.f <= temp.f) {
							this._open.splice(i + 1, 0, node);
							return;
						}
					}
					//node最大,则放头里去
					this._open.unshift(node);
				}
			}
		}

		/**冒泡算法排序open列表,找到最小f(可以优化) */
		private sortOpenList() {
			if (this.openListKind == 1) {
				let openLen = this._open.length;
				for (let m = 0; m < openLen; m++) {
					for (let n = m + 1; n < openLen; n++) {
						if (this._open[m].f < this._open[n].f) {
							let temp = this._open[m];
							this._open[m] = this._open[n];
							this._open[n] = temp;
						}
					}
				}
			}
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

		//是否待检查
		private isOpen(node: Node): boolean {
			for (var i = 0; i < this._open.length; i++) {
				if (this._open[i] == node) {
					return true;
				}
			}
			return false;
		}

		//是否已检查
		private isClosed(node: Node): boolean {
			for (var i = 0; i < this._closed.length; i++) {
				if (this._closed[i] == node) {
					return true;
				}
			}
			return false;
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

}