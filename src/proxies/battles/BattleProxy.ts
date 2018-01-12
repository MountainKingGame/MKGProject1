class BattleProxy {
    public facade:ModelFacade;
    public model:BattleModel;
    public init(){
        this.model = new BattleModel();
        this.model.facade = this.facade;
        this.model.init();
        // let tank:TankVo = new TankVo();
        // tank.id = 1001;
        // this.model.partialAdd.addTank(tank);
        //
        this.facade.netMgr.req(123,null);
    }
    public onFrame() {
        this.model.partialOnFrame.onFrame();
    }
    public clearFrame(){
        this.model.clearFrame();
    }
}