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
        }
    }
}