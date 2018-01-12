class BattleModel {
    public facade:ModelFacade;
    public partialAdd:BattleModelPartialAdd = new BattleModelPartialAdd(this);
    public partialOnFrame:BattleModelPartialOnFrame = new BattleModelPartialOnFrame(this);
    /**
     * 当前帧
     */
    public currFrame:number;
    public tanks:{[key:number]:TankVo};
    //--
    public dirty:boolean = false;
    //
    public init(){
        this.currFrame = 0;
        this.tanks = {};
    }
    public clearFrame(){
        this.dirty = false;
    }
}