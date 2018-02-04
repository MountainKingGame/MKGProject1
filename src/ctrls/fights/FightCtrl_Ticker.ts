class FightCtrl_Ticker {
    public ctrl: FightCtrl;
    constructor(ctrl: FightCtrl) {
        this.ctrl = ctrl;
    }
    private frameOutCallbackDic: { [key: number]: Function } = {};
    public init() {
        this.lastMs = new Date().getTime();
        this.nextFrameNeedMs = models.fights.FightModelConfig.si.modelMsPerFrame;
        MsgMgr.si.add(CtrlConst.Msg_OnGameTick, this, this.tick);
        //===
        // this.frameOutCallbackDic[FightFrameOutputKind.TankDirChange] = ;//TODO:
        // this.frameOutCallbackDic[FightFrameOutputKind.TankXyChange] = ;//TODO:
        this.frameOutCallbackDic[FightFrameOutputKind.AddTank] = this.frameOut_AddTank;
        this.frameOutCallbackDic[FightFrameOutputKind.AddBullet] = this.frameOut_AddBullet;
        this.frameOutCallbackDic[FightFrameOutputKind.BulletHitBorder] = this.frameOut_BulletHitBorder;
        this.frameOutCallbackDic[FightFrameOutputKind.BulletHitBullet] = this.frameOut_BulletHitBullet;
        this.frameOutCallbackDic[FightFrameOutputKind.BulletHitCell] = this.frameOut_BulletHitCell;
        this.frameOutCallbackDic[FightFrameOutputKind.BulletHitTank] = this.frameOut_BulletHitTank;
        this.frameOutCallbackDic[FightFrameOutputKind.RemoveBullet] = this.frameOut_RemoveBullet;
        this.frameOutCallbackDic[FightFrameOutputKind.RemoveTank] = this.frameOut_RemoveTank;
        this.frameOutCallbackDic[FightFrameOutputKind.RebirthTank] = this.frameOut_RebirthTank;
        this.frameOutCallbackDic[FightFrameOutputKind.AddEffect] = this.frameOut_AddEffect;
        this.frameOutCallbackDic[FightFrameOutputKind.RemoveEffect] = this.frameOut_RemoveEffect;
        //===
    }
    lastMs: number = 0;
    private currMs: number = 0;
    /** 上一帧多出来的时间 */
    lastFrameExtraMs: number = 0;
    /** 需要多少ms到下一个关键帧 */
    nextFrameNeedMs: number = 0;
    pausing = false;

    private hitCellBoomEffDic: { [key: number]: true };//一个子弹可以击中多个cell,但每帧仅为这个子弹显示一次特效

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
            this.nextFrameNeedMs = 0;
        } else {
            let deltaMs = this.currMs - this.lastMs;
            if (deltaMs > 1000) {
                this.lastFrameExtraMs = 0;
                this.nextFrameNeedMs = 0;
                this.lastMs = this.currMs;
                return;//TODO: 断线重连
            }
            if ((deltaMs + this.lastFrameExtraMs) >= models.fights.FightModelConfig.si.modelMsPerFrame) {
                this.ctrl.proxy.isFrame = true;
                this.lastFrameExtraMs = (deltaMs + this.lastFrameExtraMs) - models.fights.FightModelConfig.si.modelMsPerFrame;
                if (this.lastFrameExtraMs >= models.fights.FightModelConfig.si.modelMsPerFrame) {
                    this.nextFrameNeedMs = 0;
                } else {
                    this.nextFrameNeedMs = models.fights.FightModelConfig.si.modelMsPerFrame - this.lastFrameExtraMs;
                }
            } else {
                this.lastFrameExtraMs += deltaMs;
                this.nextFrameNeedMs = models.fights.FightModelConfig.si.modelMsPerFrame - this.lastFrameExtraMs;
            }
        }
        //--
        this.lastMs = this.currMs;
        //---
        if (this.ctrl.proxy.isFrame) {
            this.ctrl.proxy.tick();
            this.ctrl.ui.m_txt0.text = this.ctrl.proxy.currFrame.toString() + "-" + this.ctrl.proxy.currKeyFrame.toString();
            // console.log("[info]","this is frame",this.owner.model.currFrame,this.owner.proxy.isKeyFrame);
            //-- deal frame output
            this.hitCellBoomEffDic = {};//每帧都要清空
            for (let i = 0; i < this.ctrl.proxy.model.frameOutputs.length; i++) {
                let item = this.ctrl.proxy.model.frameOutputs[i]
                let callback = this.frameOutCallbackDic[item.kind];
                if(callback){
                    callback.call(this,item);
                }
            }
        }
        /** 无论是不是帧 ctrl层还是要tick的 */
        this.tickCtrl();
    }
    frameOut_AddTank(item: FightFrameIOItem) {
        this.ctrl.addTank(this.ctrl.proxy.model.tankDic[item.uid]);
    }
    frameOut_AddBullet(item: FightFrameIOItem) {
        this.ctrl.addBulletById(item.data0 as number);
        let bullet: BulletCtrl = this.ctrl.bulletDic[item.data0];
        let mc = ResMgr.si.change_cannon_effect();
        this.ctrl.topEffLayer.addChild(mc);
        mc.setScale(0.3, 0.3);
        mc.setXY(bullet.vo.xOld, bullet.vo.yOld);//old才是此帧发出点,x,y已经是move一帧后的位置了
    }
    frameOut_BulletHitBorder(item: FightFrameIOItem) {
        this.pausing = DebugConfig.pauseWhenHit;
        let bullet: BulletCtrl = this.ctrl.bulletDic[item.data0];
        this.showBulletHitEff(bullet.vo);
    }
    frameOut_BulletHitBullet(item: FightFrameIOItem) {
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
    }
    frameOut_BulletHitCell(item: FightFrameIOItem) {
        this.pausing = DebugConfig.pauseWhenHit;
        if (!this.hitCellBoomEffDic[item.data0]) {
            this.showBulletHitEff(this.ctrl.bulletDic[item.data0].vo);
            this.hitCellBoomEffDic[item.data0] = true;
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
            FuiUtil.setScale(mc,0.5);
            mc.setXY(hitCellVo.x + models.fights.FightModelConfig.si.cellSizeHalf, hitCellVo.y + models.fights.FightModelConfig.si.cellSizeHalf);
        }
    }
    frameOut_BulletHitTank(item: FightFrameIOItem) {
        this.pausing = DebugConfig.pauseWhenHit;
        this.showBulletHitEff(this.ctrl.bulletDic[item.data0].vo);
        let hitTank: TankCtrl = this.ctrl.tankDic[item.data1];
        if (hitTank.vo.hp > 0) {
            FightCtrlUtil.refreshCrack(hitTank.ui.m_avatar.m_crack as fuis.elements_0.UI_Crack, hitTank.vo.hp, hitTank.vo.hpMax);
        }
    }
    frameOut_RemoveBullet(item: FightFrameIOItem) {
        // let bulletVo = this.owner.model.dumpBulletDic[item.data0];
        this.ctrl.removeBulletByUid(item.data0);
    }
    frameOut_RemoveTank(item: FightFrameIOItem) {
        let tank: TankCtrl = this.ctrl.tankDic[item.uid];
        this.showTankDeadEff(tank);
        this.ctrl.removeTank(tank);
    }
    frameOut_RebirthTank(item: FightFrameIOItem) {
        {
            let tank = this.ctrl.tankDic[item.uid];
            this.showTankDeadEff(tank);
            tank.movableEleCtrl.moveDirImmediately();
        }
    }
    frameOut_AddEffect(item: FightFrameIOItem) {
        this.ctrl.tankDic[item.uid].addBuffEffect(item.data0);
    }
    frameOut_RemoveEffect(item: FightFrameIOItem) {
        this.ctrl.tankDic[item.uid].removeBuffEffect(item.data0);
    }
    //===
    showTankDeadEff(tank: TankCtrl) {
        let mc = ResMgr.si.mcBoomHuangJin();
        this.ctrl.topEffLayer.addChild(mc);
        mc.setXY(tank.ui.x, tank.ui.y);
    }
    showBulletHitEff(bulletVo: models.fights.BulletVo) {
        // let mc = ResMgr.si.mcBoomBaiYin();
        let mc = ResMgr.si.mcBoomHuangJin();
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