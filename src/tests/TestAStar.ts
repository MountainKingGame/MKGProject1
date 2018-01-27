
namespace astars {
	export class TestAStar extends egret.Sprite {
		private _cellSize: number = 30;
		private aStar: astars.AStar;
		private _player: egret.Sprite;
		private _index: number;
		private _path: Node[];
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
			this._player.graphics.beginFill(0x0000FF);
			this._player.graphics.drawCircle(0, 0, 10);
			this._player.graphics.endFill();
			this.addChild(this._player);
			//find a walkable node
			for (let i = 0; i < this.aStar._grid.numCols; i++) {
				for (let j = 0; j < this.aStar._grid.numRows; j++) {
					var node: astars.Node = this.aStar._grid.getNode(i, j);
					if (node.walkable) {
						this._player.x = (node.x + 0.5) * this._cellSize;
						this._player.y = (node.y + 0.5) * this._cellSize;
						return;
					}
				}
			}
		}


		/**
		 * Creates a grid with a bunch of random unwalkable nodes.
		 */
		private makeGrid() {
			this.aStar._grid = new astars.Grid(30, 30);
			for (let i = 0; i < this.aStar._grid.numCols; i++) {
				for (let j = 0; j < this.aStar._grid.numRows; j++) {
					this.aStar._grid.setWalkable(i, j, Math.random() > 0.3);
				}
			}
			//
			this.aStar._grid.setWalkable(0, 0, false);
			//
			this.drawGrid();
		}

		/**
		 * Draws the given grid, coloring each cell according to its state.
		 */
		private drawGrid() {
			this.graphics.clear();
			console.log("[log] drawGrid --------------");
			for (let i = 0; i < this.aStar._grid.numCols; i++) {
				for (let j = 0; j < this.aStar._grid.numRows; j++) {
					var node: astars.Node = this.aStar._grid.getNode(i, j);
					// console.log("[log] drawGrid node", i, j, node.walkable);
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
		private getColor(node: astars.Node) {
			if (!node.walkable) return 0xFF00FF;
			if (node == this.aStar._grid.startNode) return 0x00FFFF;
			if (node == this.aStar._grid.endNode) return 0xFFFF00;
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
			if (this.aStar._grid.getNodeSafe(xpos, ypos) == null) {
				return;
			}
			this.aStar._grid.setEndNode(xpos, ypos);

			xpos = Math.floor(this._player.x / this._cellSize);
			ypos = Math.floor(this._player.y / this._cellSize);
			this.aStar._grid.setStartNode(xpos, ypos);
			this.drawGrid();

			this.startTime = egret.getTimer();
			if (this.aStar.findPath()) {
				this._path = this.aStar.path;
				this._index = 0;
				this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}
			console.log("[debug]",this.aStar.openListKind,"`this.aStar.openListKind`");
			console.log("[debug]",egret.getTimer() - this.startTime, "`FireMs`", this.aStar.debug_calculateCount, "`calculateCount`",this.aStar.debug_openCompareCount,"`debug_openCompareCount`");
		}
		private OnKeyBoardUp(keycode: number): void {
			switch (keycode) {
				case KeyBoardCtrl.KEY_0:
					let startNode: Node = this.aStar._grid.startNode;
					this._player.x = startNode.x * this._cellSize + this._cellSize / 2;
					this._player.y = startNode.y * this._cellSize + this._cellSize / 2;
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
			}
		}
		private onGridMove(event: egret.TouchEvent): void {
			if (KeyBoardCtrl.si.ctrlKey || KeyBoardCtrl.si.altKey) {
				var xpos = Math.floor(event.stageX / this._cellSize);
				var ypos = Math.floor(event.stageY / this._cellSize);
				this.aStar._grid.setWalkable(xpos, ypos, KeyBoardCtrl.si.altKey);
				this.drawGrid();
			}
		}

		private startTime = 0;

		/**
		 * Finds the next node on the path and eases to it.
		 */
		private onEnterFrame(event: egret.Event): void {
			var targetX = this._path[this._index].x * this._cellSize + this._cellSize / 2;
			var targetY = this._path[this._index].y * this._cellSize + this._cellSize / 2;
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
