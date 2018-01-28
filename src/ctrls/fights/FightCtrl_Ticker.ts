class FightCtrl_Ticker {
    public ctrl: FightCtrl;
    constructor(ctrl: FightCtrl) {
        this.ctrl = ctrl;
    }
    public init() {
        this.lastMs = new Date().getTime();
        this.nextFrameNeedTime = models.fights.FightModelConfig.si.modelMsPerFrame;
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
            this.lastMs = FUtil.now();
            return;
        }
        this.ctrl.proxy.isFrame = false;
        this.currMs = FUtil.now();
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
            if ((deltaMs + this.lastFrameExtraMs) >= models.fights.FightModelConfig.si.modelMsPerFrame) {
                this.ctrl.proxy.isFrame = true;
                this.lastFrameExtraMs = (deltaMs + this.lastFrameExtraMs) - models.fights.FightModelConfig.si.modelMsPerFrame;
                if (this.lastFrameExtraMs >= models.fights.FightModelConfig.si.modelMsPerFrame) {
                    this.nextFrameNeedTime = 0;
                } else {
                    this.nextFrameNeedTime = models.fights.FightModelConfig.si.modelMsPerFrame - this.lastFrameExtraMs;
                }
            } else {
                this.lastFrameExtraMs += deltaMs;
                this.nextFrameNeedTime = models.fights.FightModelConfig.si.modelMsPerFrame - this.lastFrameExtraMs;
            }
        }
        //--
        this.lastMs = this.currMs;
        //---
        if (this.ctrl.proxy.isFrame) {
            this.ctrl.ui.m_txt0.text = this.ctrl.proxy.currFrame.toString() + "-" + this.ctrl.proxy.currKeyFrame.toString();
            let hitCellBoomEffDic: { [key: number]: true } = {};//每个子弹可以击中多个cell,但仅显示一次特效
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
                    case FightFrameOutputKind.AddTank:
                        this.ctrl.addTank(this.ctrl.proxy.model.tankDic[item.uid]);
                        break;
                    case FightFrameOutputKind.AddBullet:
                        this.ctrl.addBulletById(item.data0 as number);
                        break;
                    case FightFrameOutputKind.BulletHitBullet:
                        this.pausing = DebugConfig.pauseWhenHit;
                        let bullet: BulletCtrl = this.ctrl.bulletDic[item.data0];
                        this.showBulletHitEff(bullet.vo);
                        if (bullet.vo.apTank > 0) {
                            FightCtrlUtil.refreshCrack(bullet.ui.m_crack as fuis.elements_0.UI_Crack, bullet.vo.apTank, bullet.vo.apTankMax);
                        }
                        let hitBullet: BulletCtrl = this.ctrl.bulletDic[item.data1];
                        if (hitBullet.vo.apTank > 0) {
                            FightCtrlUtil.refreshCrack(hitBullet.ui.m_crack as fuis.elements_0.UI_Crack, hitBullet.vo.apTank, hitBullet.vo.apTankMax);
                        }
                        break;
                    case FightFrameOutputKind.BulletHitCell:
                        this.pausing = DebugConfig.pauseWhenHit;
                        if (!hitCellBoomEffDic[item.data0]) {
                            this.showBulletHitEff(this.ctrl.bulletDic[item.data0].vo);
                            hitCellBoomEffDic[item.data0] = true;
                        }
                        //-
                        let hitCellVo: models.fights.CellVo = this.ctrl.model.cellDic[item.data1];
                        let hitCell: fuis.elements_0.UI_MapCell = this.ctrl.cellDic[hitCellVo.uid];
                        if (hitCellVo.hp > 0) {
                            FightCtrlUtil.refreshCrack(hitCell.m_crack as fuis.elements_0.UI_Crack, hitCellVo.hp, hitCellVo.hpMax);
                        } else {
                            hitCell.m_kind.selectedIndex = hitCellVo.sid;
                            FightCtrlUtil.initCrack(hitCell.m_crack);
                            //-
                            let mc = ResMgr.si.mcBoomQingTong();
                            this.ctrl.topEffLayer.addChild(mc);
                            mc.setScale(0.6, 0.6);
                            mc.setXY(hitCellVo.x + models.fights.FightModelConfig.si.cellSizeHalf, hitCellVo.y + models.fights.FightModelConfig.si.cellSizeHalf);
                        }
                        break;
                    case FightFrameOutputKind.BulletHitTank:
                        this.pausing = DebugConfig.pauseWhenHit;
                        this.showBulletHitEff(this.ctrl.bulletDic[item.data0].vo);
                        let hitTank: TankCtrl = this.ctrl.tankDic[item.data1];
                        if (hitTank.vo.hp > 0) {
                            FightCtrlUtil.refreshCrack(hitTank.ui.m_avatar.m_crack as fuis.elements_0.UI_Crack, hitTank.vo.hp, hitTank.vo.hpMax);
                        }
                        break;
                    case FightFrameOutputKind.RemoveBullet:
                        // let bulletVo = this.owner.model.dumpBulletDic[item.data0];
                        this.ctrl.removeBulletByUid(item.data0);
                        break;
                    case FightFrameOutputKind.RemoveTank:
                        {
                            let tank: TankCtrl = this.ctrl.tankDic[item.uid];
                            this.showTankDeadEff(tank);
                            this.ctrl.removeTank(tank);
                        }
                        break;
                    case FightFrameOutputKind.RebirthTank:
                        {
                            let tank = this.ctrl.tankDic[item.uid];
                            this.showTankDeadEff(tank);
                            tank.movableEleCtrl.moveDirImmediately();
                        }
                        break;
                    case FightFrameOutputKind.AddEffect:
                        this.ctrl.tankDic[item.uid].addBuffEffect(item.data0);
                        break;
                    case FightFrameOutputKind.RemoveEffect:
                        this.ctrl.tankDic[item.uid].removeBuffEffect(item.data0);
                        break;
                }
            }
        }
        /** 无论是不是关键帧 ctrl层还是要tick的 */
        this.tickCtrl();
    }
    showTankDeadEff(tank: TankCtrl) {
        let mc = ResMgr.si.mcBoomHuangJin();
        this.ctrl.topEffLayer.addChild(mc);
        mc.setXY(tank.ui.x, tank.ui.y);
    }
    showBulletHitEff(bulletVo: models.fights.BulletVo) {
        let mc = ResMgr.si.mcBoomBaiYin();
        this.ctrl.topEffLayer.addChild(mc);
        mc.setScale(0.3, 0.3);
        mc.setXY(bulletVo.x, bulletVo.y);
    }
    tickCtrl() {
        for (const uid in this.ctrl.tankDic) {
            const tank = this.ctrl.tankDic[uid];
            tank.tick();
        }
        for (const uid in this.ctrl.bulletDic) {
            const bullet = this.ctrl.bulletDic[uid];
            bullet.tick();
        }
        this.ctrl.alginByMyTank();
    }

}