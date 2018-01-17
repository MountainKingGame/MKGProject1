class BulletCtrl extends CtrlBase<fuis.elements_1.UI_Bullet>{
    vo:models.battles.BulletVo;
    constructor(){
        super(fuis.elements_1.UI_Bullet.createInstance());
    }
    public init(){
        super.init();
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
    battle:BattleCtrl;
    tick():void{
        if(this.battle.partialTick.isTickModel){
            this.ui.rotation = CommonHelper.dir4ToDegree(this.vo.dir); 
            this.ui.x = this.vo.x;
            this.ui.y = this.vo.y;
        }
    }
    public dispose():void{
        if(this.ui!=null){
            this.ui.dispose();
            this.ui = null;
        }
        super.dispose();
    }
}