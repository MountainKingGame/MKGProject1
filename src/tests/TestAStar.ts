
namespace astars {
	export class TestAStar extends egret.Sprite {
		private _cellSize: number = 30;
		private aStar: astars.AStar;
		private _player: egret.Sprite;
		private _index: number;
		private _path: INode[];
		private _spArr: egret.Sprite[][];

		public constructor() {
			super();
			// let a = [2,3,4];
			// a.splice(1,0,8);
			// console.log("[info]",a,"`a`");
			this.aStar = new astars.AStar();
			this.makeGrid();
			this.makePlayer();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
				this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridClick, this);
				this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGridMove, this);
			}, this);
			KeyBoardCtrl.si.init();
			MsgMgr.si.add(KeyBoardCtrl.KeyUp, this, this.OnKeyBoardUp);
		}

		/**
		 * Creates the player sprite. Just a circle here.
		 */
		private makePlayer() {
			this._player = new egret.Sprite();
			this._player.graphics.beginFill(0x0000FF, 0.6);
			if (this.aStar.nodeWalkableOffsetArr == null) {
				this._player.graphics.drawCircle(0, 0, 10);
			} else {
				this._player.graphics.drawRoundRect(-this._cellSize / 2, -this._cellSize / 2, this._cellSize * 2, this._cellSize * 2, 12, 12);
			}
			this._player.graphics.endFill();
			this.addChild(this._player);
			//find a walkable node
			for (let i = 0; i < this.aStar.grid.colLen; i++) {
				for (let j = 0; j < this.aStar.grid.rowLen; j++) {
					var node: astars.INode = this.aStar.grid.nodes[i][j];
					if (node.walkable) {
						this._player.x = (node.col + 0.5) * this._cellSize;
						this._player.y = (node.row + 0.5) * this._cellSize;
						return;
					}
				}
			}
		}

		/**
		 * Creates a grid with a bunch of random unwalkable nodes.
		 */
		private makeGrid() {
			this.aStar.grid = new astars.Grid();
			this.aStar.grid.init(Node.newNodes(30,30));
			for (let i = 0; i < this.aStar.grid.colLen; i++) {
				for (let j = 0; j < this.aStar.grid.rowLen; j++) {
					this.aStar.grid.nodes[i][j].walkable = Math.random() > 0.3;
				}
			}
			this.drawGrid();
		}

		/**
		 * Draws the given grid, coloring each cell according to its state.
		 */
		private drawGrid() {
			this.graphics.clear();
			console.log("[log] drawGrid --------------");
			for (let i = 0; i < this.aStar.grid.colLen; i++) {
				for (let j = 0; j < this.aStar.grid.rowLen; j++) {
					var node: astars.INode = this.aStar.grid.nodes[i][j];
					//---有bug,连续画图有问题
					// this.graphics.beginFill(this.getColor(node));
					// this.graphics.drawRect(i * this._cellSize, j * this._cellSize, this._cellSize, this._cellSize);
					// this.graphics.endFill();
					//---
					let sp: egret.Sprite;
					if (this._spArr == undefined) {
						this._spArr = [];
					}
					if (this._spArr[i] == undefined) {
						this._spArr[i] = [];
					}
					if (this._spArr[i][j] == undefined) {
						sp = new egret.Sprite();
						this._spArr[i][j] = sp;
						this.addChild(sp);
						sp.x = i * this._cellSize;
						sp.y = j * this._cellSize;
					} else {
						sp = this._spArr[i][j];
					}
					sp.graphics.clear();
					sp.graphics.beginFill(this.getColor(node));
					sp.graphics.drawRect(0, 0, this._cellSize, this._cellSize);
					sp.graphics.endFill();
				}
			}
			console.log("[log] drawGrid end --------------");
			//--
			// this.graphics.clear();
			// this.graphics.lineStyle(0);
			// this.graphics.beginFill(0x345678);
			// this.graphics.drawRect(0, 0, 120, 120);
			// this.graphics.endFill();
			// this.graphics.beginFill(0x987654);
			// this.graphics.drawRect(100, 100, 120, 120);
			// this.graphics.endFill();
		}

		/**
		 * Determines the color of a given node based on its state.
		 */
		private getColor(node: astars.INode) {
			if (!node.walkable) return 0xFF00FF;
			if (node == this.aStar.startNode) return 0x00FFFF;
			if (node == this.aStar.endNode) return 0xFFFF00;
			return 0x00FF00;
		}

		/**
		 * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
		 */
		private onGridClick(event: egret.TouchEvent): void {
			if (KeyBoardCtrl.si.ctrlKey || KeyBoardCtrl.si.altKey) {
				this.onGridMove(event);
				return;
			}
			var xpos = Math.floor(event.stageX / this._cellSize);
			var ypos = Math.floor(event.stageY / this._cellSize);
			if (this.aStar.grid.getNodeSafe(xpos, ypos) == null) {
				return;
			}
			this.aStar.setEndNode(xpos, ypos);
			this.run();
		}
		private run() {
			var xpos = Math.floor(this._player.x / this._cellSize);
			var ypos = Math.floor(this._player.y / this._cellSize);
			this.aStar.setStartNode(xpos, ypos);
			this.drawGrid();

			this.startTime = egret.getTimer();
			if (this.aStar.findPath()) {
				this._path = this.aStar.resultPath;
				this._index = 0;
				this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}
			console.log("[debug] Kind:", this.aStar.openListKind, "<-`openListKind`", this.aStar.searchCellKind, "`searchCellKind`", this.frameGapNeed, "`frameGapNeed`",this.aStar.costWalkDisable,"<-`this.aStar.costWalkDisable`");
			console.log("[debug]", egret.getTimer() - this.startTime, "`FireMs`", this.aStar.debug_calculateCount, "`calculateCount`", this.aStar.debug_openCompareCount, "`debug_openCompareCount`");
			// alert("[debug]"+","+(egret.getTimer() - this.startTime)+","+"`FireMs`"+","+this.aStar.debug_calculateCount+","+"`calculateCount`"+","+this.aStar.debug_openCompareCount+","+"`debug_openCompareCount`");
		}
		private OnKeyBoardUp(keycode: number): void {
			switch (keycode) {
				case KeyBoardCtrl.KEY_0:
					{
						let startNode: INode = this.aStar.startNode;
						this._player.x = startNode.col * this._cellSize + this._cellSize / 2;
						this._player.y = startNode.row * this._cellSize + this._cellSize / 2;
					}
					break;
				case KeyBoardCtrl.KEY_DOT_BIG:
					{
						let startNode: INode = this.aStar.startNode;
						this._player.x = startNode.col * this._cellSize + this._cellSize / 2;
						this._player.y = startNode.row * this._cellSize + this._cellSize / 2;
						this.run();
					}
					break;
				case KeyBoardCtrl.KEY_1:
					this.aStar.openListKind = astars.OpenListKind.BubbleSort;
					break;
				case KeyBoardCtrl.KEY_2:
					this.aStar.openListKind = astars.OpenListKind.PushCompare;
					break;
				case KeyBoardCtrl.KEY_3:
					this.aStar.openListKind = astars.OpenListKind.ArraySort;
					break;
				case KeyBoardCtrl.KEY_4:
					this.aStar.openListKind = astars.OpenListKind.BinaryHeap;
					break;
				case KeyBoardCtrl.KEY_5:
					this.aStar.searchCellKind = astars.SearchCellKind.Normal;
					break;
				case KeyBoardCtrl.KEY_6:
					this.aStar.searchCellKind = astars.SearchCellKind.MinFAround;
					break;
				case KeyBoardCtrl.KEY_7:
					this.frameGapNeed -= 10;
					if (this.frameGapNeed < 1) {
						this.frameGapNeed = 1;
					}
					break;
				case KeyBoardCtrl.KEY_8:
					this.frameGapNeed += 10;
					break;
				case KeyBoardCtrl.KEY_9:
					this.aStar.costWalkDisable = !this.aStar.costWalkDisable;
					break;
			}
		}
		private onGridMove(event: egret.TouchEvent): void {
			if (KeyBoardCtrl.si.ctrlKey || KeyBoardCtrl.si.altKey) {
				var xpos = Math.floor(event.stageX / this._cellSize);
				var ypos = Math.floor(event.stageY / this._cellSize);
				this.aStar.grid[xpos][ypos] = KeyBoardCtrl.si.altKey;
				this.drawGrid();
			}
		}

		private startTime = 0;
		private frameCount = 0;
		private frameGapNeed = 1;
		/**
		 * Finds the next node on the path and eases to it.
		 */
		private onEnterFrame(event: egret.Event): void {
			this.frameCount++;
			if (this.frameCount >= this.frameGapNeed) {
				this.frameCount = 0;
				//
				var targetX = this._path[this._index].col * this._cellSize + this._cellSize / 2;
				var targetY = this._path[this._index].row * this._cellSize + this._cellSize / 2;
				this._player.x = targetX;
				this._player.y = targetY;
				var dx = targetX - this._player.x;
				var dy = targetY - this._player.y;
				var dist = Math.sqrt(dx * dx + dy * dy);
				if (dist < 1) {
					this._index++;
					if (this._index >= this._path.length) {
						this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
					}
				}
				else {
					this._player.x += dx * .5;
					this._player.y += dy * .5;
				}
			}
		}
	}
}
