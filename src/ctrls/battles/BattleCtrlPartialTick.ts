class BattleCtrlPartialTick {
    public owner: BattleCtrl;
    constructor(owner: BattleCtrl) {
        this.owner = owner;
    }
    public init() {
        this.lastKeyFrameTime = new Date().getTime();
        MsgMgr.si.add(CtrlConst.Msg_OnGameTick,this,this.tick);
        // setInterval(this.tick.bind(this), CtrlConfig.si.viewMsPerFrame);
    }
    lastKeyFrameTime: number = 0;
    isKeyFrame: boolean = false;
    public tick() {
        this.isKeyFrame = false;
        let currTime: number = new Date().getTime();
        if (CtrlConfig.si.viewFrameRate <= models.battles.BattleConfig.si.modelFrameRate
            || (currTime - this.lastKeyFrameTime) >= models.battles.BattleConfig.si.modelMsPerFrame) {
            this.isKeyFrame = true;
            // console.log("[debug]",currTime - this.lastTickModelTime);
            this.lastKeyFrameTime = currTime-(currTime - this.lastKeyFrameTime)%models.battles.BattleConfig.si.modelMsPerFrame;
            this.owner.proxy.tick();
            //--frame output
            for (let i = 0; i < this.owner.proxy.model.frameOutputs.length; i++) {
                let item = this.owner.proxy.model.frameOutputs[i];
                switch (item.kind) {
                    // case BattleFrameIOKind.TankDirChange:
                    // case BattleFrameIOKind.TankXyChange:
                    // this.owner.tanks[item.playerId].onFrameOutput(item);
                    // break;
                    case BattleFrameIOKind.AddTank:
                        // this.owner.AddTank();
                        break;
                    case BattleFrameIOKind.AddBullet:
                        this.owner.addBulletById(item.data0 as number);
                        break;
                }
            }
        }
        // console.log("[info]","is key fame",this.isTickModel);
        for (const uid in this.owner.tanks) {
            const tank = this.owner.tanks[uid];
            tank.tick();
        }
        for (const uid in this.owner.bulletMap) {
            const bullet = this.owner.bulletMap[uid];
            bullet.tick();
        }
    }

}