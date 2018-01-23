namespace models.battles {
    export class BattleModel {
        public facade: ModelFacade;
        public adder: BattleModel_Adder = new BattleModel_Adder(this);
        public ticker: BattleModelPartialTick = new BattleModelPartialTick(this);
        //===
        public cellUId: number = 1;
        public tankUId: number = 1;
        /**当前帧*/
        public currFrame: number = 0;
        //---
        public stcMapVo: IStcMapVo;
        public cellMap: { [key: number]: CellVo } = {};//key:Vo.uid
        public tankMap: { [key: number]: TankVo } = {};
        public bulletMap: { [key: number]: BulletVo } = {};
        //
        public dumpCellMap: { [key: number]: CellVo } = {};
        public dumpTankMap: { [key: number]: TankVo } = {};
        public dumpBulletMap: { [key: number]: BulletVo } = {};
        //---
        qtCell: QuadTree;
        qtTank: QuadTree;
        qtBullet: QuadTree;
        //---
        aiTankMap: { [key: number]: TankAI } = {};
        //---
        public gridSize:IGrid;
        public size: Vector2;
        //--
        frameInputs: BattleFrameIOItem[] = [];
        frameOutputs: BattleFrameIOItem[] = [];
        //
        public init(stcMapId: number) {
            BattleModelConfig.si.init();
            //-
            this.stcMapVo = StcMap.si.getVo(stcMapId);
            //-
            this.gridSize = {};
            this.gridSize.col = this.stcMapVo.cells[0].length;
            this.gridSize.row = this.stcMapVo.cells.length;
            this.size = new Vector2(this.gridSize.col * BattleModelConfig.si.cellSize, this.gridSize.row * BattleModelConfig.si.cellSize);
            //-
            this.qtCell = new QuadTree(new QuadTreeRect(0, this.size.x, 0, this.size.y));
            this.qtTank = new QuadTree(new QuadTreeRect(0, this.size.x, 0, this.size.y));
            this.qtBullet = new QuadTree(new QuadTreeRect(0, this.size.x, 0, this.size.y));
            //-
            this.initCells();
            this.initTanks();
        }
        initCells() {
            for (let row = 0; row < this.stcMapVo.cells.length; row++) {
                for (let col = 0; col < this.stcMapVo.cells[row].length; col++) {
                    var vo: CellVo = new CellVo();
                    vo.uid = this.cellUId++;
                    vo.sid = this.stcMapVo.cells[row][col];
                    vo.x = models.battles.BattleModelUtil.gridToPos(col);
                    vo.y = models.battles.BattleModelUtil.gridToPos(row);
                    this.adder.addCellVo(vo);
                }
            }
        }
        initTanks() {
            for (let i = 0; i < this.stcMapVo.positions.length; i++) {
                let tankVo = this.adder.addTankByIStcMapVoPlayer(this.stcMapVo.positions[i]);
                tankVo.initIndex = i;
                if (i == 0) {
                    tankVo.group = BattleGroup.Player;
                } else {
                    tankVo.group = BattleGroup.CPU;
                    tankVo.moveDir = tankVo.dir;
                    let ai: TankAI = new TankAI();
                    ai.owner = tankVo;
                    this.aiTankMap[tankVo.uid] = ai;
                }
            }
        }
        tankAlignGridX(tank: TankVo) {
            tank.x = BattleModelUtil.gridToPos(BattleModelUtil.alignGrid(tank.x, 1, this.gridSize.col - 1));
        }
        tankAlignGridY(tank: TankVo) {
            tank.y = BattleModelUtil.gridToPos(BattleModelUtil.alignGrid(tank.y, 1, this.gridSize.row - 1));
        }
        validateTankX(tank: TankVo) {
            tank.x = MathUtil.clamp(tank.x, tank.sizeHalf.x, this.size.x - tank.sizeHalf.y);
            tank.x = Math.round(tank.x);
        }
        validateTankY(tank: TankVo) {
            tank.y = MathUtil.clamp(tank.y, tank.sizeHalf.x, this.size.y - tank.sizeHalf.y);
            tank.y = Math.round(tank.y);
        }

    }
}