class ModelFacade {
    public static inst: ModelFacade;
    public battleProxy: BattleProxy;
    public battleModel: BattleModel;
    public timeMgr: TimeMgr;
    public netMgr: NetMgr;
    constructor() {
    }
    public init(){
        this.timeMgr = new TimeMgr();
        this.netMgr = new NetMgr();
        this.netMgr.init();
    }
}