class ModelFacade {
    public static si: ModelFacade;
    public battleProxy: BattleProxy;
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