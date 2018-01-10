class CtrlFacade extends ModelFacade{
    public static si: CtrlFacade;

    public root: fairygui.GComponent;

    public init(){
        super.init();
        console.log("[info]","CtrlFacade.init()","2018-01-10 16:26:30");
        this.root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(this.root);
        //
        var ctrl:SceneCtrl = new SceneCtrl();
        ctrl.init();
        this.root.addChild(ctrl.ui);
    }
    
}