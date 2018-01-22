namespace models.battles {
    export class BattleModel {
        public facade: ModelFacade;
        public adder: BattleModel_Adder = new BattleModel_Adder(this);
        public ticker: BattleModelPartialTick = new BattleModelPartialTick(this);
        //===
        public cellUId:number = 1;
        public tankUId:number = 1;
        public currFrame: number = 0;
        //===
        public stcMapVo: IStcMapVo;
        /**当前帧*/
        public cellMap: { [key: number]: CellVo } = {};//key:Vo.uid
        public tankMap: { [key: number]: TankVo } = {};//key:Vo.uid
        public bulletMap: { [key: number]: BulletVo } = {};//key:Vo.uid
        //
        qtCell:QuadTree;
        qtTank:QuadTree;
        qtBullet:QuadTree;
        //
        public size:Vector2;
        //--
        frameInputs:BattleFrameIOItem[] = [];
        frameOutputs:BattleFrameIOItem[] = [];
        //
        public init(stcMapId:number) {
            BattleConfig.si.init();
            //
            this.stcMapVo = StcMap.si.getVo(stcMapId);
            this.size = new Vector2(this.stcMapVo.size.col*BattleConfig.si.cellSize,this.stcMapVo.size.row*BattleConfig.si.cellSize);
            //
            this.qtCell = new QuadTree(new QuadTreeRect(0,this.size.x,0,this.size.y));
            this.qtTank = new QuadTree(new QuadTreeRect(0,this.size.x,0,this.size.y));
            this.qtBullet = new QuadTree(new QuadTreeRect(0,this.size.x,0,this.size.y));
            for (let i = 0; i < this.stcMapVo.cells.length; i++) {
                var vo:CellVo = new CellVo();
                vo.uid = this.cellUId++;
                vo.sid = this.stcMapVo.cells[i];
                let grid = CommonHelper.indexToGridH(i, this.stcMapVo.size.col);
                vo.x = models.battles.BattleUtil.gridToPos(grid.col);
                vo.y = models.battles.BattleUtil.gridToPos(grid.row);
                this.adder.addCellVo(vo);
            }
            //
            for (let i = 0; i < this.stcMapVo.players.length; i++) {
                this.adder.addTankByIStcMapVoPlayer(this.stcMapVo.players[i]);
                break;//TODO: only add one as myTank
            }
        }
        tankAlignGridX(tank:TankVo){
            tank.x = BattleUtil.gridToPos(BattleUtil.alignGrid(tank.x,1, this.stcMapVo.size.col - 1));
        }
        tankAlignGridY(tank:TankVo){
            tank.y = BattleUtil.gridToPos(BattleUtil.alignGrid(tank.y,1, this.stcMapVo.size.row - 1));
        }
        validateTankX(tank:TankVo){
            tank.x = MathUtil.clamp(tank.x,tank.hitRect.z_w,this.size.x - tank.hitRect.z_w);
            tank.x = Math.round(tank.x);
        }
        validateTankY(tank:TankVo){
            tank.y = MathUtil.clamp(tank.y,tank.hitRect.z_h,this.size.y - tank.hitRect.z_h);
            tank.y = Math.round(tank.y);
        }
    }
}