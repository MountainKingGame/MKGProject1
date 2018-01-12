class TankCtrl extends CtrlBase{
    public ui:fuis.elements_1.UI_Tank;
    constructor(){
        let view = fuis.elements_1.UI_Tank.createInstance();
        super(view);
        this.ui = view;
        this.ui.setPivot(0.5,0.5,true);
        this.ui.setXY(300,500);
        this.ui.rotation = 180;
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
    public dispose():void{
        if(this.ui!=null){
            this.ui.dispose();
            this.ui = null;
        }
        super.dispose();
    }
    public init(){
        super.init();
        // this.view.m_icon.color = "0x00FF00";
        // this.view.m_icon.color = 0x00FFFF;
    }
}