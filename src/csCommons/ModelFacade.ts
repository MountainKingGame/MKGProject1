class ModelFacade{
    public static inst:ModelFacade;
    public battleProxy:BattleProxy;
    public battleModel:BattleModel;
    public timeMgr:TimeMgr;
    public netMgr:NetMgr;
    constructor(){
        console.log("[debug]","ModelFacade constructor");
        this.timeMgr = new TimeMgr();
        this.netMgr = new NetMgr();
        this.netMgr.init();
    }
}