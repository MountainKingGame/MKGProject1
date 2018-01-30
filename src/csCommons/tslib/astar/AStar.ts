
/**
 * A星寻路
 * @author chenkai
 * @see https://www.cnblogs.com/gamedaybyday/p/7778995.html
 * @since 2017/11/3
 */
namespace astars {
	export class AStar {
		public _grid: Grid;               //网格
		private _openArr: Node[];               //待考察表
		private _openList: DoubleLinkedList;               //待考察表(双链表)
		private _endNode: Node;                  //终点Node
		private _startNode: Node;                //起点Node
		private _path: Node[];               //结果路径
		//
		private _heuristic: Function;            //计算h的算法
		private _straightCost: number = 10;     //上下左右走的代价
		private _diagCost: number = 14;//Math.SQRT2;  //diagonal 斜着走的代价 

		private roundOffset8: IVector2[] = [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }];
		private roundOffset4: IVector2[] = [{ x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }];

		public nodeWalkableOffsetArr: IVector2[] = null;
		/** 测试物占用4格需要的数据 */
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


		public get path(): Node[] {
			return this._path;
		}

		public constructor() {
			this._openList = new DoubleLinkedList();
			this._heuristic = this.manhattan;
			// this._heuristic = this.euclidian;
			// this._heuristic = this.diagonal;
		}

		//寻路
		public findPath(): boolean {
			this.debug_calculateCount = 0;
			this.debug_openCompareCount = 0;

			this.openMask > 99999999 ? this.openMask = 1 : this.openMask++;
			this.closeMask = this.openMask;

			this._openArr = [];
			this._openList.clear(false);

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
				let minFNode: Node = this.searchAround(node);
				node.closeMask = this.closeMask;
				if (this._openArr.length == 0 && this._openList.length == 0) {
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
							node = this._openList.pop() as Node;
							break;
						case OpenListKind.BinaryHeap:
							node = BinaryHeapUtil.popMin(this._openArr, Node.Word_f);
							break;
						default:
							node = this._openArr.pop();
							break;
					}
				}
			}
			this.generateResultPath();
			return true;
		}

		private checkWalkable(node: Node, endNodeCanWalk: boolean): boolean {
			if (endNodeCanWalk == true && node == this._endNode) {
				return true;
			}
			if (!this.nodeWalkableOffsetArr) {
				return node.walkable;
			}
			for (let i = 0; i < this.nodeWalkableOffsetArr.length; i++) {
				let offset = this.nodeWalkableOffsetArr[i];
				let item: Node = this._grid.getNodeSafe(node.x + offset.x, node.y + offset.y);
				if (item == null || item.walkable == false) {
					return false;
				}
			}
			return true;
		}
		/**处理周围的格子 */
		private searchAround(node: Node) {
			let minFNode: Node;
			let roundOffset;
			if (this.canDiag) {
				roundOffset = this.roundOffset8;
			} else {
				roundOffset = this.roundOffset4;
			}
			for (var i = 0; i < roundOffset.length; i++) {
				this.debug_calculateCount++;
				let offset: IVector2 = roundOffset[i];
				var test: Node = this._grid.getNodeSafe(node.x + offset.x, node.y + offset.y);
				if (test == null || test == node) {
					continue;
				}
				var cost: number = this._straightCost;
				if (this.checkWalkable(test, true) == false) {
					if (this.costWalkDisable) {
						cost = 10000;//不可经过地方设置一个很高的值,可以保证目标点无法到达时也能算出路径
					} else {
						//这种计算会导致 目标点无法到达时 无法算出路径
						continue;
					}
				} else {
					if (this.canDiag == true) {
						if (!this._grid.getNode(node.x, test.y).walkable ||
							!this._grid.getNode(test.x, node.y).walkable) {
							if (this.costWalkDisable) {
								//夹角 两侧都是不可同行的
								cost = 3000;
							} else {
								continue;
							}
						} else {
							if (!((node.x == test.x) || (node.y == test.y))) {
								cost = this._diagCost;
							}
						}
					}
				}
				var g = node.g + cost * test.costMultiplier;
				var h = this._heuristic(test);
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

		private openListPush(node: Node) {
			node.openMask = this.openMask;
			switch (this.openListKind) {
				case OpenListKind.BubbleSort:
				case OpenListKind.ArraySort:
					this._openArr.push(node);
					break;
				case OpenListKind.PushCompare:
					let openLen = this._openList.length;
					if (openLen == 0) {
						this._openList.push(node);
					} else {
						let item = this._openList.head;
						while (item != null) {
							this.debug_openCompareCount++;
							if (node.f < (item as Node).f) {
								this._openList.insertNext(node, item);
								return;
							}
							if (item.prevNode == null) {
								//到tail了, node没有插入到队伍里,说明是最大的,则放头里去
								this._openList.insertPrev(node, item);
								return;
							} else {
								item = item.prevNode;
							}
						}
					}
					break;
				case OpenListKind.BinaryHeap:
					BinaryHeapUtil.pushMin(this._openArr, node, Node.Word_f);
					break;
			}
		}

		/**冒泡算法排序open列表,找到最小f(可以优化) */
		private sortOpenList() {
			switch (this.openListKind) {
				case OpenListKind.BubbleSort:
					if (this.openListKind == 1) {
						let openLen = this._openArr.length;
						for (let m = 0; m < openLen; m++) {
							for (let n = m + 1; n < openLen; n++) {
								this.debug_openCompareCount++;
								if (this._openArr[m].f < this._openArr[n].f) {
									let temp = this._openArr[m];
									this._openArr[m] = this._openArr[n];
									this._openArr[n] = temp;
								}
							}
						}
					}
					break;
				case OpenListKind.ArraySort:
					this._openArr.sort(this.arraySortCompare.bind(this));
					break;
				//default://其它方法不需要额外排序
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

		//生成最终路径
		private generateResultPath(): void {
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
			this._path = [];
			var node: Node = this._endNode;
			this._path.push(node);
			while (node != this._startNode) {
				if (this.checkWalkable(node, false) == false) {
					// if (node.walkable == false) {
					node = node.previous;
					this._path = [node];
				} else {
					let offsetX: number = node.previous.x - node.x;
					let offsetY: number = node.previous.y - node.y;
					if (lastOffsetX == undefined || lastOffsetX != offsetX || lastOffsetY != offsetY) {
						lastOffsetX = offsetX;
						lastOffsetY = offsetY;
						node = node.previous;
						this._path.push(node);
					} else {
						node = node.previous;
						this._path[this._path.length - 1] = node;
					}
				}
			}
			this._path.reverse();
			//---
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