class TankCtrl extends CtrlBase<fuis.elements_1.UI_Tank>{
    vo: models.battles.TankVo;
    battle: BattleCtrl;
    movableEleCtrl: MovableEleCtrl;
    constructor() {
        super(fuis.elements_1.UI_Tank.createInstance());
    }
    public init() {
        super.init();
        this.ui.setPivot(0.5, 0.5, true);
        this.movableEleCtrl = new MovableEleCtrl(this.ui);
        this.movableEleCtrl.changeDir = true;
        this.movableEleCtrl.vo = this.vo;
        this.movableEleCtrl.battle = this.battle;
        this.movableEleCtrl.init();
        //
        // this.ui.alpha = 0.3;
        //
        this.refreshCrack();
    }

    tick(): void {
        if (this.vo.stateA == models.battles.BattleVoStateA.Living) {
            this.movableEleCtrl.tick();
        }
    }

    public dispose(): void {
        this.movableEleCtrl.dispose();
        this.movableEleCtrl = null;
        super.dispose();
    }
    effectMap: { [key: number]: fairygui.GComponent } = {};
    public addBuffEffect(kind: StcEffectSid): void {
        let comp = fuis.elements_1.UI_InvincibleEffect.createInstance();
        this.ui.addChild(comp);
        this.effectMap[kind] = comp;
    }
    public removeBuffEffect(kind: StcEffectSid): void {
        this.effectMap[kind].dispose();
        delete this.effectMap[kind];
    }
    refreshCrack() {
        (this.ui.m_avatar.m_crack as fuis.battles_1.UI_Crack).m_lv.selectedIndex = 2;
    }
}