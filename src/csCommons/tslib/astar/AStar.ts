
/**
 * A星寻路
 * @author chenkai
 * @see https://www.cnblogs.com/gamedaybyday/p/7778995.html
 * @since 2017/11/3
 */
namespace astars {
	export class AStar {
		static Word_f = "f";

		public grid: Grid;               //网格
		private openArr: INode[];               //待考察表
		private openList: DoubleLinkedList;               //待考察表(双链表)
		endNode: INode;                  //终点Node
		startNode: INode;                //起点Node
		resultPath: INode[];               //结果路径
		//
		private funcHeuristic: Function;            //计算h的算法
		private straightCost: number = 10;     //上下左右走的代价
		private diagCost: number = 14;//Math.SQRT2;  //diagonal 斜着走的代价 

		private roundOffset8: IVector2[] = [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }];
		private roundOffset4: IVector2[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];
		/** 寻路物体仅占用1格 */
		public nodeWalkableOffsetArr: IVector2[] = null;
		/** 寻路物体占用4格需要的数据 */
		// public nodeWalkableOffsetArr: IVector2[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }];

		private openMask: number = 0;
		private closeMask: number = 0;

		/**能否斜着走 */
		canDiag: boolean = false;
		/**不可行走区域的cost,如果是0则不可以过去,但这样会导致 目标点无法到达时 无法算出路径 */
		costWalkDisable: boolean = true;
		//
		openListKind: OpenListKind = OpenListKind.BinaryHeap;
		searchCellKind: SearchCellKind = SearchCellKind.Normal;

		public debug_calculateCount: number;
		public debug_openCompareCount: number;


		public constructor() {
			this.openList = new DoubleLinkedList();
			this.funcHeuristic = this.manhattan;
			// this._heuristic = this.euclidian;
			// this._heuristic = this.diagonal;
		}

		public setEndNode(x:number, y:number){
			this.endNode = this.grid.nodes[x][y];
		}

		public setStartNode(x:number, y:number){
			this.startNode = this.grid.nodes[x][y];
		}

		//寻路
		public findPath(): boolean {
			this.debug_calculateCount = 0;
			this.debug_openCompareCount = 0;

			this.openMask > 99999999 ? this.openMask = 1 : this.openMask++;
			this.closeMask = this.openMask;

			this.openArr = [];
			this.openList.clear(false);

			this.startNode.g = 0;
			this.startNode.h = this.funcHeuristic(this.startNode);
			this.startNode.f = this.startNode.g + this.startNode.h;

			return this.search();
		}
		//查找路径
		private search(): boolean {
			var node: INode = this.startNode;
			while (node != this.endNode) {
				let minFNode: INode = this.searchAround(node);
				node.closeMask = this.closeMask;
				if (this.openArr.length == 0 && this.openList.length == 0) {
					console.log("AStar >> no path found");
					return false;
				}
				if (minFNode != null) {
					node = minFNode;
				} else {
					this.sortOpenList();
					node.openMask = 0;
					switch (this.openListKind) {
						case OpenListKind.PushCompare:
							node = this.openList.pop() as INode;
							break;
						case OpenListKind.BinaryHeap:
							node = BinaryHeapUtil.popMin(this.openArr, AStar.Word_f);
							break;
						default:
							node = this.openArr.pop();
							break;
					}
				}
			}
			this.optimizeResultPath();
			return true;
		}

		private checkWalkable(node: INode, endNodeCanWalk: boolean): boolean {
			if (endNodeCanWalk == true && node == this.endNode) {
				return true;
			}
			if (!this.nodeWalkableOffsetArr) {
				return node.walkable;
			}
			//---寻路物体占用多格时
			for (let i = 0; i < this.nodeWalkableOffsetArr.length; i++) {
				let offset = this.nodeWalkableOffsetArr[i];
				let item: INode = this.grid.getNodeSafe(node.col + offset.x, node.row + offset.y);
				if (endNodeCanWalk == true && item == this.endNode) {
					return true;
				}
				if (item == null || item.walkable == false) {
					return false;
				}
			}
			return true;
		}
		/**处理周围的格子 */
		private searchAround(node: INode) {
			let minFNode: INode;
			let roundOffset;
			if (this.canDiag) {
				roundOffset = this.roundOffset8;
			} else {
				roundOffset = this.roundOffset4;
			}
			for (var i = 0; i < roundOffset.length; i++) {
				this.debug_calculateCount++;
				let offset: IVector2 = roundOffset[i];
				var test: INode = this.grid.getNodeSafe(node.col + offset.x, node.row + offset.y);
				if (test == null || test == node) {
					continue;
				}
				var cost: number = this.straightCost;
				if (this.checkWalkable(test, true) == false) {
					if (this.costWalkDisable) {
						cost = 10000;//不可经过地方设置一个很高的值,可以保证目标点无法到达时也能算出路径
					} else {
						//这种计算会导致 目标点无法到达时 无法算出路径
						continue;
					}
				} else {
					if (this.canDiag == true) {
						if (!this.grid.nodes[node.col][test.row].walkable ||
							!this.grid.nodes[test.col][node.row].walkable) {
							if (this.costWalkDisable) {
								//夹角 两侧都是不可同行的
								cost = 3000;
							} else {
								continue;
							}
						} else {
							if (!((node.col == test.col) || (node.row == test.row))) {
								cost = this.diagCost;
							}
						}
					}
				}
				var g = node.g + cost * test.costMultiplier;
				var h = this.funcHeuristic(test);
				var f = g + h;
				if (test.openMask == this.openMask || test.closeMask == this.closeMask) {
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
					switch (this.searchCellKind) {
						case SearchCellKind.MinFAround:
							if (minFNode == null || test.f < minFNode.f) {
								minFNode = test;
							}
							break;
					}
				}
			}
			return minFNode;
		}

		private openListPush(node: INode) {
			node.openMask = this.openMask;
			switch (this.openListKind) {
				case OpenListKind.BubbleSort:
				case OpenListKind.ArraySort:
					this.openArr.push(node);
					break;
				case OpenListKind.PushCompare:
					let openLen = this.openList.length;
					if (openLen == 0) {
						this.openList.push(node);
					} else {
						let item = this.openList.head;
						while (item != null) {
							this.debug_openCompareCount++;
							if (node.f < (item as INode).f) {
								this.openList.insertNext(node, item);
								return;
							}
							if (item.prevNode == null) {
								//到tail了, node没有插入到队伍里,说明是最大的,则放头里去
								this.openList.insertPrev(node, item);
								return;
							} else {
								item = item.prevNode;
							}
						}
					}
					break;
				case OpenListKind.BinaryHeap:
					BinaryHeapUtil.pushMin(this.openArr, node, AStar.Word_f);
					break;
			}
		}

		/**冒泡算法排序open列表,找到最小f(可以优化) */
		private sortOpenList() {
			switch (this.openListKind) {
				case OpenListKind.BubbleSort:
					if (this.openListKind == 1) {
						let openLen = this.openArr.length;
						for (let m = 0; m < openLen; m++) {
							for (let n = m + 1; n < openLen; n++) {
								this.debug_openCompareCount++;
								if (this.openArr[m].f < this.openArr[n].f) {
									let temp = this.openArr[m];
									this.openArr[m] = this.openArr[n];
									this.openArr[n] = temp;
								}
							}
						}
					}
					break;
				case OpenListKind.ArraySort:
					this.openArr.sort(this.arraySortCompare.bind(this));
					break;
				//default://其它方法不需要额外排序
			}
		}
		private arraySortCompare(a: INode, b: INode): number {
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

		//生成最终路径
		private optimizeResultPath(): void {
			//---普通
			// this._path = [];
			// var node: Node = this._endNode;
			// this._path.push(node);
			// while (node != this._startNode) {
			// 	node = node.previous;
			// 	this._path.unshift(node);
			// }
			//---路径压缩
			let lastOffsetX: number;
			let lastOffsetY: number;
			var node: INode = this.endNode;
			this.resultPath = [];
			this.resultPath.push(node);
			while (node != this.startNode) {
				if (this.checkWalkable(node, false) == false) {
					node = node.previous;
					this.resultPath = [node];
				} else {
					let offsetX: number = node.previous.col - node.col;
					let offsetY: number = node.previous.row - node.row;
					if (this.resultPath.length==1 || (lastOffsetX == undefined || lastOffsetX != offsetX || lastOffsetY != offsetY) ){
						//this.resultPath.length==1时,不要替换,因为这是最终目的点,这个点可能是endNode,也可能是walkable=false时重新找出来的点
						//this.resultPath.length不可能=0
						lastOffsetX = offsetX;
						lastOffsetY = offsetY;
						node = node.previous;
						this.resultPath.push(node);
					} else {
						node = node.previous;
						this.resultPath[this.resultPath.length - 1] = node;
					}
				}
			}
			this.resultPath.reverse();
			//---
		}

		//曼哈顿算法
		private manhattan(node: INode) {
			return (Math.abs(node.col - this.endNode.col) + Math.abs(node.row + this.endNode.row)) * this.straightCost;
		}


		private euclidian(node: INode) {
			var dx = node.col - this.endNode.col;
			var dy = node.row - this.endNode.row;
			return Math.sqrt(dx * dx + dy * dy) * this.straightCost;
		}

		private diagonal(node: INode) {
			var dx = Math.abs(node.col - this.endNode.col);
			var dy = Math.abs(node.row - this.endNode.row);
			var diag = Math.min(dx, dy);
			var straight = dx + dy;
			return this.diagCost * diag + this.straightCost * (straight - 2 * diag);
		}
	}
	export enum SearchCellKind {
		Normal = 1,
		/** 直接用周围的最小f 但效果并不好,还是用回normal吧 */
		MinFAround = 2,
	}
	export enum OpenListKind {
		/**冒泡排序 */
		BubbleSort = 1,
		/**js默认的sort排序 */
		ArraySort = 2,
		/**push时普通排序 */
		PushCompare = 3,
		/**二叉堆 */
		BinaryHeap = 4,
	}
}