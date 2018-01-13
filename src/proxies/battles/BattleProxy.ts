class BattleProxy {
    facade:ModelFacade;
    public model:battleModels.BattleModel;
    public init(){
        this.model = new battleModels.BattleModel();
        this.model.facade = this.facade;
        this.model.init();
        // this.facade.netMgr.req(123,null);
    }
    public tick() {
        this.model.partialTick.tick();
    }
    public clearFrame(){
        this.model.clearFrame();
    }
}