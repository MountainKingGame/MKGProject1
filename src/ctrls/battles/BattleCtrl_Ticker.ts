class BattleCtrl_Ticker {
    public ctrl: BattleCtrl;
    constructor(ctrl: BattleCtrl) {
        this.ctrl = ctrl;
    }
    public init() {
        this.lastMs = new Date().getTime();
        this.nextFrameNeedTime = models.battles.BattleModelConfig.si.modelMsPerFrame;
        MsgMgr.si.add(CtrlConst.Msg_OnGameTick, this, this.tick);
        // setInterval(this.tick.bind(this), CtrlConfig.si.viewMsPerFrame);
    }
    lastMs: number = 0;
    private currMs: number = 0;
    /** 上一帧多出来的时间 */
    lastFrameExtraMs: number = 0;
    /** 需要多少ms到下一个关键帧 */
    nextFrameNeedTime: number = 0;
    pausing = false;
    public tick() {
        // console.log(SUtil.now());
        if (this.pausing) {
            this.lastMs = SUtil.now();
            return;
        }
        this.ctrl.proxy.isFrame = false;
        this.currMs = SUtil.now();
        //--
        if (this.ctrl.proxy.isChaseFrame) {
            this.ctrl.proxy.isFrame = true;
            this.nextFrameNeedTime = 0;
        } else {
            let deltaMs = this.currMs - this.lastMs;
            if (deltaMs > 1000) {
                this.lastFrameExtraMs = 0;
                this.nextFrameNeedTime = 0;
                this.lastMs = this.currMs;
                return;//TODO: 断线重连
            }
            if ((deltaMs + this.lastFrameExtraMs) >= models.battles.BattleModelConfig.si.modelMsPerFrame) {
                this.ctrl.proxy.isFrame = true;
                this.lastFrameExtraMs = (deltaMs + this.lastFrameExtraMs) - models.battles.BattleModelConfig.si.modelMsPerFrame;
                if (this.lastFrameExtraMs >= models.battles.BattleModelConfig.si.modelMsPerFrame) {
                    this.nextFrameNeedTime = 0;
                } else {
                    this.nextFrameNeedTime = models.battles.BattleModelConfig.si.modelMsPerFrame - this.lastFrameExtraMs;
                }
            } else {
                this.lastFrameExtraMs += deltaMs;
                this.nextFrameNeedTime = models.battles.BattleModelConfig.si.modelMsPerFrame - this.lastFrameExtraMs;
            }
        }
        //--
        this.lastMs = this.currMs;
        //---
        if (this.ctrl.proxy.isFrame) {
            this.ctrl.ui.m_txt0.text = this.ctrl.proxy.currFrame.toString() + "-" + this.ctrl.proxy.currKeyFrame.toString();
            let hitCellBoomEffMap: { [key: number]: true } = {};//每个子弹可以击中多个cell,但仅显示一次特效
            this.ctrl.proxy.tick();
            // console.log("[info]","this is frame",this.owner.model.currFrame,this.owner.proxy.isKeyFrame);
            //-- deal frame output
            for (let i = 0; i < this.ctrl.proxy.model.frameOutputs.length; i++) {
                let item = this.ctrl.proxy.model.frameOutputs[i];
                switch (item.kind) {
                    // case BattleFrameOutputKind.TankDirChange:
                    // case BattleFrameOutputKind.TankXyChange:
                    // this.owner.tanks[item.playerId].onFrameOutput(item);
                    // break;
                    case BattleFrameOutputKind.AddTank:
                        this.ctrl.addTank(this.ctrl.proxy.model.tankMap[item.uid]);
                        break;
                    case BattleFrameOutputKind.AddBullet:
                        this.ctrl.addBulletById(item.data0 as number);
                        break;
                    case BattleFrameOutputKind.BulletHitBullet:
                        this.pausing = DebugConfig.pauseWhenHit;
                        let bullet: BulletCtrl = this.ctrl.bulletMap[item.data0];
                        this.showBulletHitEff(bullet.vo);
                        if (bullet.vo.apTank > 0) {
                            BattleCtrlUtil.refreshCrack(bullet.ui.m_crack as fuis.battles_1.UI_Crack, bullet.vo.apTank, bullet.vo.apTankMax);
                        }
                        let hitBullet: BulletCtrl = this.ctrl.bulletMap[item.data1];
                        if (hitBullet.vo.apTank > 0) {
                            BattleCtrlUtil.refreshCrack(hitBullet.ui.m_crack as fuis.battles_1.UI_Crack, hitBullet.vo.apTank, hitBullet.vo.apTankMax);
                        }
                        break;
                    case BattleFrameOutputKind.BulletHitCell:
                        this.pausing = DebugConfig.pauseWhenHit;
                        if (!hitCellBoomEffMap[item.data0]) {
                            this.showBulletHitEff(this.ctrl.bulletMap[item.data0].vo);
                            hitCellBoomEffMap[item.data0] = true;
                        }
                        //-
                        let hitCellVo: models.battles.CellVo = this.ctrl.model.cellMap[item.data1];
                        let hitCell: fuis.battles_1.UI_MapCell = this.ctrl.cellMap[hitCellVo.uid];
                        if (hitCellVo.hp > 0) {
                            BattleCtrlUtil.refreshCrack(hitCell.m_crack as fuis.battles_1.UI_Crack, hitCellVo.hp, hitCellVo.hpMax);
                        } else {
                            hitCell.m_kind.selectedIndex = hitCellVo.sid;
                            BattleCtrlUtil.initCrack(hitCell.m_crack);
                            //-
                            let mc = ResMgr.si.mcBoomQingTong();
                            this.ctrl.eleLayer.addChild(mc);
                            mc.setScale(0.6, 0.6);
                            mc.setXY(hitCellVo.x + models.battles.BattleModelConfig.si.cellSizeHalf, hitCellVo.y + models.battles.BattleModelConfig.si.cellSizeHalf);
                        }
                        break;
                    case BattleFrameOutputKind.BulletHitTank:
                        this.pausing = DebugConfig.pauseWhenHit;
                        this.showBulletHitEff(this.ctrl.bulletMap[item.data0].vo);
                        let hitTank: TankCtrl = this.ctrl.tankMap[item.data1];
                        if (hitTank.vo.hp > 0) {
                            BattleCtrlUtil.refreshCrack(hitTank.ui.m_avatar.m_crack as fuis.battles_1.UI_Crack, hitTank.vo.hp, hitTank.vo.hpMax);
                        }
                        break;
                    case BattleFrameOutputKind.RemoveBullet:
                        // let bulletVo = this.owner.model.dumpBulletMap[item.data0];
                        this.ctrl.removeBulletByUid(item.data0);
                        break;
                    case BattleFrameOutputKind.RemoveTank:
                        {
                            let tank: TankCtrl = this.ctrl.tankMap[item.uid];
                            this.showTankDeadEff(tank);
                            this.ctrl.removeTank(tank);
                        }
                        break;
                    case BattleFrameOutputKind.RebirthTank:
                        {
                            let tank = this.ctrl.tankMap[item.uid];
                            this.showTankDeadEff(tank);
                            tank.movableEleCtrl.moveDirImmediately();
                        }
                        break;
                    case BattleFrameOutputKind.AddEffect:
                        this.ctrl.tankMap[item.uid].addBuffEffect(item.data0);
                        break;
                    case BattleFrameOutputKind.RemoveEffect:
                        this.ctrl.tankMap[item.uid].removeBuffEffect(item.data0);
                        break;
                }
            }
        }
        /** 无论是不是关键帧 ctrl层还是要tick的 */
        this.tickCtrl();
    }
    showTankDeadEff(tank: TankCtrl) {
        let mc = ResMgr.si.mcBoomHuangJin();
        this.ctrl.eleLayer.addChild(mc);
        mc.setXY(tank.ui.x, tank.ui.y);
    }
    showBulletHitEff(bulletVo: models.battles.BulletVo) {
        let mc = ResMgr.si.mcBoomBaiYin();
        this.ctrl.eleLayer.addChild(mc);
        mc.setScale(0.3, 0.3);
        mc.setXY(bulletVo.x, bulletVo.y);
    }
    tickCtrl() {
        for (const uid in this.ctrl.tankMap) {
            const tank = this.ctrl.tankMap[uid];
            tank.tick();
        }
        for (const uid in this.ctrl.bulletMap) {
            const bullet = this.ctrl.bulletMap[uid];
            bullet.tick();
        }
        this.ctrl.alginByMyTank();
    }

}