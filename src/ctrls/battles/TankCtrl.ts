class TankCtrl extends CtrlBase{
    public view:fuis.elements_1.UI_Tank;
    constructor(){
        let view = fuis.elements_1.UI_Tank.createInstance();
        super(view);
        this.view = view;
        this.view.setXY(300,500);
        this.view.rotation = 180;
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
        if(this.view!=null){
            this.view.dispose();
            this.view = null;
        }
        super.dispose();
    }
    public init(){
        super.init();
        // this.view.m_icon.color = "0x00FF00";
        // this.view.m_icon.color = 0x00FFFF;
    }
}