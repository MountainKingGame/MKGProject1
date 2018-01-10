class SceneCtrl{
    public ui:fuis.Package1.UI_Scene1;
    public init(){
        this.ui = fuis.Package1.UI_Scene1.createInstance();
        //-
        // this.ui.addClickListener(this.onTouchBegin,this);
        this.ui.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
    }
    onTouchBegin(evt:TouchEvent): any {
        console.log("[info]",evt);
        this.ui.m_n0.x = Math.random()*this.ui.width;
    }
}