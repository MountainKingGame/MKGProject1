class BattleProxy {
    public isInit: boolean = false;
    facade: ModelFacade;
    public model: models.battles.BattleModel;
    public myTank: models.battles.TankVo;
    public init() {
        this.isInit = true;
        this.initEvent();
        this.model = new models.battles.BattleModel();
        this.model.facade = this.facade;
        this.model.init();
        // this.facade.netMgr.req(123,null);
        for (const key in this.model.tanks) {
            this.myTank = this.model.tanks[key];
        }

    }
    public tick() {
        this.model.partialTick.tick();
    }
    public clearFrame() {
        this.model.clearFrame();
    }
    initEvent() {
        MsgMgr.si.add(JoystickCtrl.JoystickMoving, this, this.OnInputMove);
    }
    OnInputMove(dir: Direction4) {
        // console.log("[info]",dir);
        this.myTank.moveDir = dir;
    }
}