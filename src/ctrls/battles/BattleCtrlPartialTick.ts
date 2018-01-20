class BattleCtrlPartialTick {
    public owner: BattleCtrl;
    constructor(owner: BattleCtrl) {
        this.owner = owner;
    }
    public init() {
        this.lastFrameTime = new Date().getTime();
        this.nextFrameNeedTime = models.battles.BattleConfig.si.modelMsPerFrame;
        MsgMgr.si.add(CtrlConst.Msg_OnGameTick, this, this.tick);
        // setInterval(this.tick.bind(this), CtrlConfig.si.viewMsPerFrame);
    }
    lastFrameTime: number = 0;
    private currTime: number = 0;
    /** 多出来的时间 */
    extraMs:number = 0;
    /** 需要多少ms到下一个关键帧 */
    nextFrameNeedTime: number = 0;
    public isFrame: boolean = false;
    public tick() {
        this.isFrame = false;
        this.currTime = SUtil.getTime();
        //--
        if (this.owner.proxy.isChaseFrame) {
            this.isFrame = true;
            this.nextFrameNeedTime = 0;
        } else {
            let gapMs = this.currTime - this.lastFrameTime;
            if((gapMs+this.extraMs)>=models.battles.BattleConfig.si.modelMsPerFrame){
                this.isFrame = true;
                this.extraMs = (gapMs+this.extraMs)-models.battles.BattleConfig.si.modelMsPerFrame;
                if(this.extraMs>=models.battles.BattleConfig.si.modelMsPerFrame){
                    this.nextFrameNeedTime = 0;
                }else{
                    this.nextFrameNeedTime = models.battles.BattleConfig.si.modelMsPerFrame-this.extraMs;
                }
            }else{
                this.extraMs+=gapMs;
                this.nextFrameNeedTime = models.battles.BattleConfig.si.modelMsPerFrame-this.extraMs;
            }
        }
        //--
        this.lastFrameTime = this.currTime;
        //---
        if (this.isFrame) {
            this.owner.proxy.tick();
            // console.log("[info]","this is frame",this.owner.model.currFrame,this.owner.proxy.isKeyFrame);
            //-- deal frame output
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
        /** 无论是不是关键帧 ctrl层还是要tick的 */
        this.tickCtrl();
    }
    tickCtrl(){
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