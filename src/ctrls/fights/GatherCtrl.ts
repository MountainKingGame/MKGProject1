class GatherCtrl extends CtrlBase<fuis.elements_0.UI_Star4>{
    vo: models.fights.GatherVo;
    fight: FightCtrl;
    constructor() {
        super(fuis.elements_0.UI_Star4.createInstance());
    }
    public init() {
        super.init()
        FuiUtil.setPivotCenter(this.ui);
        this.ui.x = this.vo.x;
        this.ui.y = this.vo.y;
    }
    tick(): void {
    }
    public dispose(): void {
        this.vo = null;
        this.fight = null;
        super.dispose();
    }
}