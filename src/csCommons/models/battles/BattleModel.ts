namespace models.battles {
    export class BattleModel {
        public facade: ModelFacade;
        public adder: BattleModel_Adder = new BattleModel_Adder(this);
        public ticker: BattleModelPartialTick = new BattleModelPartialTick(this);
        //===
        public cellUId:number = 1;
        public tankUId:number = 1;
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
        qtCell:QuadTree;
        qtTank:QuadTree;
        qtBullet:QuadTree;
        //---
        aiTankMap: { [key: number]: TankAI } = {};
        //---
        public size:Vector2;
        //--
        frameInputs:BattleFrameIOItem[] = [];
        frameOutputs:BattleFrameIOItem[] = [];
        //
        public init(stcMapId:number) {
            BattleModelConfig.si.init();
            //
            this.stcMapVo = StcMap.si.getVo(stcMapId);
            this.size = new Vector2(this.stcMapVo.size.col*BattleModelConfig.si.cellSize,this.stcMapVo.size.row*BattleModelConfig.si.cellSize);
            //
            this.qtCell = new QuadTree(new QuadTreeRect(0,this.size.x,0,this.size.y));
            this.qtTank = new QuadTree(new QuadTreeRect(0,this.size.x,0,this.size.y));
            this.qtBullet = new QuadTree(new QuadTreeRect(0,this.size.x,0,this.size.y));
            for (let i = 0; i < this.stcMapVo.cells.length; i++) {
                var vo:CellVo = new CellVo();
                vo.uid = this.cellUId++;
                vo.sid = this.stcMapVo.cells[i];
                let grid = CommonHelper.indexToGridH(i, this.stcMapVo.size.col);
                vo.x = models.battles.BattleModelUtil.gridToPos(grid.col);
                vo.y = models.battles.BattleModelUtil.gridToPos(grid.row);
                this.adder.addCellVo(vo);
            }
            //--
            for (let i = 0; i < this.stcMapVo.players.length; i++) {
                this.adder.addTankByIStcMapVoPlayer(this.stcMapVo.players[i],i!=0);
                break;
            }
        }
        tankAlignGridX(tank:TankVo){
            tank.x = BattleModelUtil.gridToPos(BattleModelUtil.alignGrid(tank.x,1, this.stcMapVo.size.col - 1));
        }
        tankAlignGridY(tank:TankVo){
            tank.y = BattleModelUtil.gridToPos(BattleModelUtil.alignGrid(tank.y,1, this.stcMapVo.size.row - 1));
        }
        validateTankX(tank:TankVo){
            tank.x = MathUtil.clamp(tank.x,tank.sizeHalf.x,this.size.x - tank.sizeHalf.y);
            tank.x = Math.round(tank.x);
        }
        validateTankY(tank:TankVo){
            tank.y = MathUtil.clamp(tank.y,tank.sizeHalf.x,this.size.y - tank.sizeHalf.y);
            tank.y = Math.round(tank.y);
        }

    }
}