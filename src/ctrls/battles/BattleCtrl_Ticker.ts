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
    pausing = false;
    public tick() {
        if (this.pausing) {
            this.lastFrameMs = SUtil.now();
            return;
        }
        this.owner.proxy.isFrame = false;
        this.currMs = SUtil.now();
        //--
        if (this.owner.proxy.isChaseFrame) {
            this.owner.proxy.isFrame = true;
            this.nextFrameNeedTime = 0;
        } else {
            let gapMs = this.currMs - this.lastFrameMs;
            if (gapMs > 1000) {
                this.lastFrameExtraMs = 0;
                this.nextFrameNeedTime = 0;
                this.lastFrameMs = this.currMs;
                return;//TODO: 断线重连
            }
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
            let hitCellBoomEffMap: { [key: number]: true } = {};//每个子弹可以击中多个cell,但仅显示一次特效
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
                    case BattleFrameOutputKind.RebirthTank:
                        let tank = this.owner.tankMap[item.uid];
                        tank.movableEleCtrl.moveDirImmediately();
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
                        if (!hitCellBoomEffMap[item.data0]) {
                            let bulletVo: models.battles.BulletVo = this.owner.bulletMap[item.data0].vo;
                            let mv = ResMgr.si.mcBoomQingTong();
                            this.owner.eleLayer.addChild(mv);
                            mv.setXY(bulletVo.x, bulletVo.y);
                            hitCellBoomEffMap[item.data0] = true;
                        }
                        this.pausing = DebugConfig.pauseWhenHit;
                        break;
                    case BattleFrameOutputKind.BulletHitBullet:
                        let bulletVo: models.battles.BulletVo = this.owner.bulletMap[item.data0].vo;
                        let mv = ResMgr.si.mcBoomBaiYin();
                        this.owner.eleLayer.addChild(mv);
                        mv.setScale(0.3, 0.3);
                        mv.setXY(bulletVo.x, bulletVo.y);
                        this.pausing = DebugConfig.pauseWhenHit;
                        break;
                    case BattleFrameOutputKind.BulletHitTank:
                        let bulletVo_t: models.battles.BulletVo = this.owner.bulletMap[item.data0].vo;
                        let mv_t = ResMgr.si.mcBoomBaiYin();
                        this.owner.eleLayer.addChild(mv_t);
                        mv_t.setXY(bulletVo_t.x, bulletVo_t.y);
                        this.pausing = DebugConfig.pauseWhenHit;
                        break;
                    case BattleFrameOutputKind.RemoveBullet:
                        // let bulletVo = this.owner.model.dumpBulletMap[item.data0];
                        this.owner.removeBulletByUid(item.data0);
                        break;
                    case BattleFrameOutputKind.RemoveTank:
                        this.owner.removeTankByUid(item.uid);
                        break;
                    case BattleFrameOutputKind.AddEffect:
                        this.owner.tankMap[item.uid].addBuffEffect(item.data0);
                        break;
                    case BattleFrameOutputKind.RemoveEffect:
                        this.owner.tankMap[item.uid].removeBuffEffect(item.data0);
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