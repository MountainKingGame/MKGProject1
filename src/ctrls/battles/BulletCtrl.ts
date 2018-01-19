class BulletCtrl extends CtrlBase<fuis.elements_1.UI_Bullet>{
    vo:models.battles.BulletVo;
    battle:BattleCtrl;
    movableEleCtrl:MovableEleCtrl;
    constructor(){
        super(fuis.elements_1.UI_Bullet.createInstance());
    }
    public init(){
        super.init();
        this.ui.setPivot(0.5,0.5,true);
        this.movableEleCtrl = new MovableEleCtrl(this.ui);
        this.movableEleCtrl.vo = this.vo;
        this.movableEleCtrl.battle = this.battle;
        this.movableEleCtrl.init();
    }
    tick():void{
        this.movableEleCtrl.tick();
        var gc:fairygui.GComponent = fuis.elements_1.UI_Bullet.createInstance();
        this.ui.parent.addChild(gc);
        gc.setPivot(0.5,0.5,true);
        gc.setXY(this.ui.x,this.ui.y);
    }
    public dispose():void{
        this.movableEleCtrl.dispose();
        this.movableEleCtrl = null;
        super.dispose();
    }
}