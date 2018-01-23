class BattleCtrl_Ticker {
    public owner: BattleCtrl;
    constructor(owner: BattleCtrl) {
        this.owner = owner;
    }
    public init() {
        this.lastFrameMs = new Date().getTime();
        this.nextFrameNeedTime = models.battles.BattleModelConfig.si.modelMsPerFrame;
        MsgMgr.si.add(CtrlConst.Msg_OnGameTick, this, this.tick);
        // setInterval(this.tick.bind(this), CtrlConfig.si.viewMsPerFrame);
    }
    lastFrameMs: number = 0;
    private currMs: number = 0;
    /** 上一帧多出来的时间 */
    lastFrameExtraMs: number = 0;
    /** 需要多少ms到下一个关键帧 */
    nextFrameNeedTime: number = 0;
    public tick() {
        this.owner.proxy.isFrame = false;
        this.currMs = SUtil.getTime();
        //--
        if (this.owner.proxy.isChaseFrame) {
            this.owner.proxy.isFrame = true;
            this.nextFrameNeedTime = 0;
        } else {
            let gapMs = this.currMs - this.lastFrameMs;
            if ((gapMs + this.lastFrameExtraMs) >= models.battles.BattleModelConfig.si.modelMsPerFrame) {
                this.owner.proxy.isFrame = true;
                this.lastFrameExtraMs = (gapMs + this.lastFrameExtraMs) - models.battles.BattleModelConfig.si.modelMsPerFrame;
                if (this.lastFrameExtraMs >= models.battles.BattleModelConfig.si.modelMsPerFrame) {
                    this.nextFrameNeedTime = 0;
                } else {
                    this.nextFrameNeedTime = models.battles.BattleModelConfig.si.modelMsPerFrame - this.lastFrameExtraMs;
                }
            } else {
                this.lastFrameExtraMs += gapMs;
                this.nextFrameNeedTime = models.battles.BattleModelConfig.si.modelMsPerFrame - this.lastFrameExtraMs;
            }
        }
        //--
        this.lastFrameMs = this.currMs;
        //---
        if (this.owner.proxy.isFrame) {
            this.owner.proxy.tick();
            // console.log("[info]","this is frame",this.owner.model.currFrame,this.owner.proxy.isKeyFrame);
            //-- deal frame output
            for (let i = 0; i < this.owner.proxy.model.frameOutputs.length; i++) {
                let item = this.owner.proxy.model.frameOutputs[i];
                switch (item.kind) {
                    // case BattleFrameOutputKind.TankDirChange:
                    // case BattleFrameOutputKind.TankXyChange:
                    // this.owner.tanks[item.playerId].onFrameOutput(item);
                    // break;
                    case BattleFrameOutputKind.AddTank:
                        this.owner.addTank(this.owner.proxy.model.tankMap[item.uid]);
                        break;
                    case BattleFrameOutputKind.AddBullet:
                        this.owner.addBulletById(item.data0 as number);
                        break;
                    case BattleFrameOutputKind.BulletHitCell:
                        let cellVo: models.battles.CellVo = this.owner.model.cellMap[item.data1];
                        this.owner.cellMap[cellVo.uid].m_kind.selectedIndex = cellVo.sid;
                        /* (discard) replace with BattleFrameOutputKind.BulletRemove
                        let bulletVo: models.battles.BulletVo = this.owner.model.bulletMap[item.data0];
                        if (bulletVo == undefined) {
                            bulletVo = this.owner.model.dumpBulletMap[item.data0];
                            //be dumped
                            this.owner.removeBullet(bulletVo);
                        } else {
                        } */
                        break;
                    case BattleFrameOutputKind.BulletHitBullet:
                        break;
                    case BattleFrameOutputKind.BulletHitTank:
                        break;
                    case BattleFrameOutputKind.BulletRemove:
                        let bulletVo = this.owner.model.dumpBulletMap[item.data0];
                        this.owner.removeBullet(bulletVo);
                        break;
                }
            }
        }
        /** 无论是不是关键帧 ctrl层还是要tick的 */
        this.tickCtrl();
    }
    tickCtrl() {
        for (const uid in this.owner.tankMap) {
            const tank = this.owner.tankMap[uid];
            tank.tick();
        }
        for (const uid in this.owner.bulletMap) {
            const bullet = this.owner.bulletMap[uid];
            bullet.tick();
        }
        this.owner.alginByMyTank();
    }

}