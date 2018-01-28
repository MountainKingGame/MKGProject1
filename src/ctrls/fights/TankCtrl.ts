class TankCtrl extends CtrlBase<fuis.elements_1.UI_Tank>{
    vo: models.fights.TankVo;
    battle: FightCtrl;
    movableEleCtrl: MovableEleCtrl;
    constructor() {
        super(fuis.elements_1.UI_Tank.createInstance());
    }
    public init() {
        super.init();
        if(this.vo.group==models.fights.FightGroup.CPU){
            this.ui.m_avatar.m_color.selectedIndex = 1;
        }else{
            this.ui.m_avatar.m_color.selectedIndex = MathUtil.randomInt(ColorIndex.Green,ColorIndex.Purple);
        }
        this.ui.setPivot(0.5, 0.5, true);
        FightCtrlUtil.initCrack(this.ui.m_avatar.m_crack as fuis.elements_0.UI_Crack);
        this.movableEleCtrl = new MovableEleCtrl(this.ui);
        this.movableEleCtrl.changeDir = true;
        this.movableEleCtrl.vo = this.vo;
        this.movableEleCtrl.battle = this.battle;
        this.movableEleCtrl.init();
        // this.ui.alpha = 0.3;
    }

    tick(): void {
        if (this.vo.stateA == models.fights.FightVoStateA.Living) {
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
}