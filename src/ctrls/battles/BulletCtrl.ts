class BulletCtrl extends CtrlBase<fuis.elements_1.UI_Bullet>{
    vo:models.battles.BulletVo;
    battle:BattleCtrl;
    movableEleCtrl:MovableEleCtrl;
    constructor(){
        super(fuis.elements_1.UI_Bullet.createInstance());
    }
    public init(){
        super.init();
        this.movableEleCtrl = new MovableEleCtrl(this.ui);
        this.movableEleCtrl.facade = this.facade;
        this.movableEleCtrl.vo = this.vo;
        this.movableEleCtrl.battle = this.battle;
        this.ui.setPivot(0.5,0.5,true);
        this.ui.setXY(this.vo.x,this.vo.y);
        //
        // this.view.m_icon.filters = [new egret.BlurFilter(12,12)];
        
        /* var cm: fairygui.utils.ColorMatrix = new fairygui.ColorMatrix();
        // let arr:number[] = [-0.14,1.00,0.94,0.39];
        let arr:number[] = [-0.35,0.95,1.00,-0.26];//红色
        cm.adjustBrightness(arr[0]);
        cm.adjustContrast(arr[1]);
        cm.adjustSaturation(arr[2]);
        cm.adjustHue(arr[3]);
        var cf: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(cm.matrix);
        this.view.m_icon.filters = [cf];*/
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