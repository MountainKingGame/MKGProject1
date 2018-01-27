
namespace astar {
	export class Game extends egret.Sprite {
		private _cellSize: number = 30;
		private _grid: astar.Grid;
		private _player: egret.Sprite;
		private _index: number;
		private _path: Node[];
		private _spArr:egret.Sprite[][];

		public constructor() {
			super();
			this.makePlayer();
			this.makeGrid();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, () => {
				this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGridClick, this);
			}, this);

		}

		/**
		 * Creates the player sprite. Just a circle here.
		 */
		private makePlayer() {
			this._player = new egret.Sprite();
			this._player.graphics.beginFill(0x0000FF);
			this._player.graphics.drawCircle(0, 0, 10);
			this._player.graphics.endFill();
			this._player.x = Math.random() * 600;
			this._player.y = Math.random() * 600;
			this.addChild(this._player);
		}


		/**
		 * Creates a grid with a bunch of random unwalkable nodes.
		 */
		private makeGrid() {
			this._grid = new astar.Grid(31, 30);
			for (var i = 0; i < 200; i++) {
				this._grid.setWalkable(Math.floor(Math.random() * 30),
					Math.floor(Math.random() * 30),
					false);
				// if (i % 2 == 0) {
				// 	console.log("[info] setWalkable",i,models.battles.BattleModelUtil.index2Col(i, this._grid.numCols),
				// 	models.battles.BattleModelUtil.index2Row(i, this._grid.numCols));
				// 	this._grid.setWalkable(
				// 		models.battles.BattleModelUtil.index2Col(i, this._grid.numCols),
				// 		models.battles.BattleModelUtil.index2Row(i, this._grid.numCols),
				// 		false);
				// }
			}
			this.drawGrid();

			// for(let m =0; m<30;m++){
			// 	for(let n=0;n<30;n++){
			// 		console.log( (this._grid.getNode(m, n).walkable== true)?1:0);
			// 	}
			// 	console.log("===");
			// }
		}

		/**
		 * Draws the given grid, coloring each cell according to its state.
		 */
		private drawGrid() {
			this.graphics.clear();
			console.log("[log] drawGrid --------------");
			for (let i = 0; i < this._grid.numCols; i++) {
				for (let j = 0; j < this._grid.numRows; j++) {
					var node: astar.Node = this._grid.getNode(i, j);
					// console.log("[log] drawGrid node", i, j, node.walkable);
					//---有bug,连续画图有问题
					// this.graphics.beginFill(this.getColor(node));
					// this.graphics.drawRect(i * this._cellSize, j * this._cellSize, this._cellSize, this._cellSize);
					// this.graphics.endFill();
					//---
					let sp: egret.Sprite;
					if(this._spArr==undefined){
						this._spArr = [];
					}
					if(this._spArr[i]==undefined){
						this._spArr[i] = [];
					}
					if(this._spArr[i][j]==undefined){
						sp = new egret.Sprite();
						this._spArr[i][j] = sp;
						this.addChild(sp);
						sp.x = i * this._cellSize;
						sp.y = j * this._cellSize; 
					}else{
						sp = this._spArr[i][j];
					}
					sp.graphics.clear();
					sp.graphics.beginFill(this.getColor(node));
					sp.graphics.drawRect(0, 0, this._cellSize, this._cellSize);
					sp.graphics.endFill();
				}
			}
			console.log("[log] drawGrid end --------------");
			this.addChild(this._player);
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
		private getColor(node: astar.Node) {
			if (!node.walkable) return 0xFF00FF;
			if (node == this._grid.startNode) return 0x00FFFF;
			if (node == this._grid.endNode) return 0xFFFF00;
			return 0x00FF00;
		}

		/**
		 * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
		 */
		private onGridClick(event: egret.TouchEvent): void {
			var xpos = Math.floor(event.stageX / this._cellSize);
			var ypos = Math.floor(event.stageY / this._cellSize);
			this._grid.setEndNode(xpos, ypos);

			xpos = Math.floor(this._player.x / this._cellSize);
			ypos = Math.floor(this._player.y / this._cellSize);
			this._grid.setStartNode(xpos, ypos);

			this.drawGrid();

			this.startTime = egret.getTimer();
			this.findPath();
			console.log("Timer:", egret.getTimer() - this.startTime);
		}

		private startTime = 0;

		/**
		 * Creates an instance of AStar and uses it to find a path.
		 */
		private findPath(): void {
			var aStar: astar.AStar = new astar.AStar();
			if (aStar.findPath(this._grid)) {
				this._path = aStar.path;
				this._index = 0;
				this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			}
		}

		/**
		 * Finds the next node on the path and eases to it.
		 */
		private onEnterFrame(event: egret.Event): void {
			var targetX = this._path[this._index].x * this._cellSize + this._cellSize / 2;
			var targetY = this._path[this._index].y * this._cellSize + this._cellSize / 2;
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
