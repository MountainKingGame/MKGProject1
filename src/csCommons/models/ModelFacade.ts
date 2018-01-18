class ModelFacade {
    public static si: ModelFacade;
    public timeMgr: TimeMgr;
    constructor() {
    }
    public init(){
        StcMap.si.init();
        this.timeMgr = new TimeMgr();
    }
}