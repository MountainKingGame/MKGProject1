class BulletCtrl extends CtrlBase<fuis.elements_1.UI_Bullet>{
    vo: models.fights.BulletVo;
    fight: FightCtrl;
    movableEleCtrl: MovableEleCtrl;
    constructor() {
        super(fuis.elements_1.UI_Bullet.createInstance());
    }
    public init() {
        super.init();
        this.ui.m_color.selectedIndex = this.vo.group==models.fights.FightGroup.CPU?1:0;
        FuiUtil.setPivotCenter(this.ui);
        FightCtrlUtil.initCrack(this.ui.m_crack as fuis.elements_0.UI_Crack);
        // this.ui.addChild(ResMgr.si.debugRect(this.ui.width / 2, this.ui.height / 2, this.vo.sizeHalf.x * 2, this.vo.sizeHalf.y * 2,true));
        this.movableEleCtrl = new MovableEleCtrl(this.ui);
        this.movableEleCtrl.changeDir = true;
        this.movableEleCtrl.vo = this.vo;
        this.movableEleCtrl.fight = this.fight;
        this.movableEleCtrl.init();
    }
    tick(): void {
        if (this.vo.stateA == models.fights.FightVoStateA.Living) {
            this.movableEleCtrl.tick();
        }
        /*  var test1:fairygui.GComponent = fuis.elements_1.UI_Bullet.createInstance();
         this.ui.parent.addChild(test1);
         test1.setPivot(0.5,0.5,true);
         test1.setXY(this.ui.x,this.ui.y); */
    }
    public dispose(): void {
        this.vo = null;
        this.fight = null;
        this.movableEleCtrl.dispose();
        this.movableEleCtrl = null;
        super.dispose();
    }
}