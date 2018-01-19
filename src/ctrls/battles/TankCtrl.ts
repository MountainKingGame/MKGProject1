class TankCtrl extends CtrlBase<fuis.elements_1.UI_Tank>{
    vo:models.battles.TankVo;
    battle:BattleCtrl;
    movableEleCtrl:MovableEleCtrl;
    constructor(){
        super(fuis.elements_1.UI_Tank.createInstance());
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
    }
   
    public dispose():void{
        this.movableEleCtrl.dispose();
        this.movableEleCtrl = null;
        super.dispose();
    }
}