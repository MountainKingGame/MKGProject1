namespace models.battles {
    export class BattleModel {
        public facade: ModelFacade;
        public partialAdd: BattleModelPartialAdd = new BattleModelPartialAdd(this);
        public partialTick: BattleModelPartialTick = new BattleModelPartialTick(this);
        //===
        public tankUId:number = 100100001;
        public currFrame: number = 0;
        //===
        public stcMapVo: IStcMapVo;
        /**当前帧*/
        public tanks: { [key: number]: TankVo } = {};//key:TankVo.uid
        public size:Vector2;
        //--
        frameInputs:BattleFrameIOItem[] = [];
        frameOutputs:BattleFrameIOItem[] = [];
        //
        public init() {
            this.stcMapVo = StcMap.si.getVo(1);
            for (let i = 0; i < this.stcMapVo.players.length; i++) {
                this.partialAdd.addTankByIStcMapVoPlayer(this.stcMapVo.players[i]);
                break;//TODO: only add one
            }
            this.size = new Vector2(this.stcMapVo.size.col*BattleConfig.si.cellSize,this.stcMapVo.size.row*BattleConfig.si.cellSize);
        }
        tankAlignGridX(tank:TankVo){
            tank.x = BattleUtil.alignGridPos(tank.x, 1, this.stcMapVo.size.col - 1);
        }
        tankAlignGridY(tank:TankVo){
            tank.y = BattleUtil.alignGridPos(tank.y, 1, this.stcMapVo.size.row - 1);
        }
        validateTankX(tank:TankVo){
            tank.x = MathUtil.clamp(tank.x,tank.hitTestRadii,this.size.x - tank.hitTestRadii);
        }
        validateTankY(tank:TankVo){
            tank.y = MathUtil.clamp(tank.y,tank.hitTestRadii,this.size.y - tank.hitTestRadii);
        }
    }
}