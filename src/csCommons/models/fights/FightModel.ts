namespace models.fights {
    export class FightModel {
        public facade: ModelFacade;
        public changer: FightModel_Changer = new FightModel_Changer(this);
        public ticker: FightModel_Ticker = new FightModel_Ticker(this);
        public buffer:FightModel_Buffer = new FightModel_Buffer(this);
        //===
        public cellUId: number = 1;
        public tankUId: number = 1;
        /**当前帧*/
        public currFrame: number = 0;
        public currKeyFrame: number = 0;
        public isKeyFrame: boolean;
        //---
        public stcMapVo: IStcMapVo;
        public cellDic: { [key: number]: CellVo } = {};//key:Vo.uid
        public tankDic: { [key: number]: TankVo } = {};
        public bulletDic: { [key: number]: BulletVo } = {};
        /**各group tank数量统计 */
        groupTankCount:{[key:number]:number} = [];//key:BattleGroup
        //
        public dumpCellDic: { [key: number]: CellVo } = {};
        public dumpTankDic: { [key: number]: TankVo } = {};
        public dumpBulletDic: { [key: number]: BulletVo } = {};
        //---
        qtCell: QuadTree;
        qtTank: QuadTree;
        qtBullet: QuadTree;
        //---
        aiTankDic: { [key: number]: TankAI } = {};
        //---
        public gridSize:IGrid;
        public size: Vector2;
        //--
        frameInputs: FightFrameIOItem[] = [];
        frameOutputs: FightFrameIOItem[] = [];
        //
        factories:FightModelFactory[] = [];
        public init(stcMapId: number) {
            FightModelConfig.si.init();
            //-
            this.stcMapVo = StcMap.si.getVo(stcMapId);
            //
            this.buffer.init();
            //-
            this.gridSize = {};
            this.gridSize.col = this.stcMapVo.cells[0].length;
            this.gridSize.row = this.stcMapVo.cells.length;
            this.size = new Vector2(FightModelUtil.gridToPos(this.gridSize.col),FightModelUtil.gridToPos(this.gridSize.row));
            // * FightModelConfig.si.cellSize, this.gridSize.row * FightModelConfig.si.cellSize);
            //-
            this.qtCell = new QuadTree(new QuadTreeRect(0, this.size.x, 0, this.size.y));
            this.qtTank = new QuadTree(new QuadTreeRect(0, this.size.x, 0, this.size.y));
            this.qtBullet = new QuadTree(new QuadTreeRect(0, this.size.x, 0, this.size.y));
            //-
            this.initCells();
            this.initTanks();
            this.initFactories();
        }
        initCells() {
            for (let row = 0; row < this.stcMapVo.cells.length; row++) {
                for (let col = 0; col < this.stcMapVo.cells[row].length; col++) {
                    var vo: CellVo = new CellVo();
                    vo.uid = this.cellUId++;
                    vo.sid = this.stcMapVo.cells[row][col];
                    vo.x = models.fights.FightModelUtil.gridToPos(col);
                    vo.y = models.fights.FightModelUtil.gridToPos(row);
                    this.changer.addCell(vo);
                }
            }
        }
        initFactories(){
            for (let i = 0; i < this.stcMapVo.factories.length; i++) {
                let stcVo = this.stcMapVo.factories[i];
                let factory:FightModelFactory = new FightModelFactory();
                factory.model = this;
                factory.stcVo = stcVo;
                factory.init();
                this.factories.push(factory);
            }
        }
        initTanks() {
            for (let i = 0; i < this.stcMapVo.positions.length; i++) {
                let tankVo = this.changer.addTankByIStcMapVoPlayer(this.stcMapVo.positions[i]);
                tankVo.initIndex = i;
                if (i == 0) {
                    tankVo.group = FightGroup.Player;
                } else {
                    tankVo.group = FightGroup.CPU;
                    tankVo.moveDir = tankVo.dir;
                    let ai: TankAI = new TankAI();
                    ai.owner = tankVo;
                    this.aiTankDic[tankVo.uid] = ai;
                }
                break;//TODO:
            }
        }
        tankAlignGridX(tank: TankVo) {
            tank.x = FightModelUtil.gridToPos(FightModelUtil.alignGrid(tank.x, 1, this.gridSize.col - 1));
        }
        tankAlignGridY(tank: TankVo) {
            tank.y = FightModelUtil.gridToPos(FightModelUtil.alignGrid(tank.y, 1, this.gridSize.row - 1));
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