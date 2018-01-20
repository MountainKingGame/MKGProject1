namespace models.battles {
    export class BattleModel {
        public facade: ModelFacade;
        public partialAdd: BattleModelPartialAdd = new BattleModelPartialAdd(this);
        public partialTick: BattleModelPartialTick = new BattleModelPartialTick(this);
        //===
        public tankUId:number = 1;
        public currFrame: number = 0;
        public currKeyFrame: number = 0;
        //===
        public stcMapVo: IStcMapVo;
        /**当前帧*/
        public tanks: { [key: number]: TankVo } = {};//key:Vo.uid
        public bullets: { [key: number]: BulletVo } = {};//key:Vo.uid
        public size:Vector2;
        //--
        frameInputs:BattleFrameIOItem[] = [];
        frameOutputs:BattleFrameIOItem[] = [];
        //
        public init(stcMapId:number) {
            models.battles.BattleConfig.si.init();
            //
            this.stcMapVo = StcMap.si.getVo(stcMapId);
            this.size = new Vector2(this.stcMapVo.size.col*BattleConfig.si.cellSize,this.stcMapVo.size.row*BattleConfig.si.cellSize);
            for (let i = 0; i < this.stcMapVo.players.length; i++) {
                this.partialAdd.addTankByIStcMapVoPlayer(this.stcMapVo.players[i]);
                break;//TODO: only add one
            }
        }
        tankAlignGridX(tank:TankVo){
            tank.x = BattleUtil.gridToPos(BattleUtil.alignGrid(tank.x,1, this.stcMapVo.size.col - 1));
        }
        tankAlignGridY(tank:TankVo){
            tank.y = BattleUtil.gridToPos(BattleUtil.alignGrid(tank.y,1, this.stcMapVo.size.row - 1));
        }
        validateTankX(tank:TankVo){
            tank.x = MathUtil.clamp(tank.x,tank.hitTestRadii,this.size.x - tank.hitTestRadii);
            tank.x = Math.round(tank.x);
        }
        validateTankY(tank:TankVo){
            tank.y = MathUtil.clamp(tank.y,tank.hitTestRadii,this.size.y - tank.hitTestRadii);
            tank.y = Math.round(tank.y);
        }
    }
}