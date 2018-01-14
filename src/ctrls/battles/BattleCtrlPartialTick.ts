class BattleCtrlPartialTick {
    public owner: BattleCtrl;
    constructor(owner: BattleCtrl) {
        this.owner = owner;
    }
    public init() {
        this.lastTickModelTime = new Date().getTime();
        setInterval(this.tick.bind(this), CtrlConfig.si.viewFrameMs);
    }
    lastTickModelTime: number = 0;
    isTickModel: boolean = false;
    public tick() {
        this.isTickModel = false;
        let currTime: number = new Date().getTime();
        if ((currTime - this.lastTickModelTime) >= models.battles.BattleConfig.si.modelFrameMs) {
            this.isTickModel = true;
            this.lastTickModelTime = currTime;
            this.owner.proxy.tick();
            //--frame output
            /*  
            for (let i = 0; i < this.owner.proxy.model.frameOutputs.length; i++) {
                let item = this.owner.proxy.model.frameOutputs[i];
                switch (item.kind) {
                    case BattleFrameIOKind.TankDirChange:
                    case BattleFrameIOKind.TankXyChange:
                        this.owner.tanks[item.playerId].onFrameOutput(item);
                        break;
                }
            } 
            */
        }
        // console.log("[info]","is key fame",this.isTickModel);
        for (const uid in this.owner.tanks) {
            const tank = this.owner.tanks[uid];
            tank.tick();
        }
    }

}