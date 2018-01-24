class ModelFacade {
    public static si: ModelFacade;
    public timeMgr: TimeMgr;
    constructor() {
    }
    public init(){
        StcMgr.si.init();
        this.timeMgr = new TimeMgr();
    }
}