class CtrlFacade{
    public static si:CtrlFacade;
    public stage:egret.Stage;
    public ctrlMgr:CtrlMgr;
    public root: fairygui.GComponent;
    public init(runFight:boolean){
        //
        ModelFacade.si = new ModelFacade();
        ModelFacade.si.init();
        //===
        NetMgr.si = new NetMgr();
        NetMgr.si.init();
        //
        this.stage.addChild(fairygui.GRoot.inst.displayObject);
        //
        KeyBoardCtrl.si.init();
        MouseWheelCtrl.si.init();
        CtrlConfig.si = new CtrlConfig();
        CtrlConfig.si.viewFrameRate = this.stage.frameRate;
        CtrlConfig.si.init();
        //===
        fairygui.UIPackage.addPackage("test_1");
        fairygui.UIPackage.addPackage("tools_0");
        fairygui.UIPackage.addPackage("elements_0");
        fairygui.UIPackage.addPackage("elements_1");
        fairygui.UIPackage.addPackage("joysticks_1");
        fairygui.UIPackage.addPackage("movieClips_1");
        fuis.elements_0.elements_0Binder.bindAll();
        fuis.elements_1.elements_1Binder.bindAll();
        fuis.joysticks_1.joysticks_1Binder.bindAll();
        fuis.tools_0.tools_0Binder.bindAll();
        //===
        this.ctrlMgr = new CtrlMgr();
        CtrlMgr.si = this.ctrlMgr;
        this.ctrlMgr.rootLayer = fairygui.GRoot.inst;
        //---
        CtrlMgr.si.regCtrl(CtrlId.FirstPage,FirstPageCtrl,fuis.elements_0.UI_FirstPage,true);
        CtrlMgr.si.regCtrl(CtrlId.Fight,FightCtrl,fuis.elements_0.UI_Fight,true);
        CtrlMgr.si.regCtrl(CtrlId.Tool_MapEditor,tools.MapEditorCtrl,fuis.tools_0.UI_MapEditor,true);
        //===
        //
        this.root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(this.root);
        //---
        if(runFight){
            CtrlFacade.si.ctrlMgr.openCtrl(CtrlId.FirstPage);
        }
        // this.stage.dirtyRegionPolicy  = "off";
    }
    onResize() {
        // console.log("[debug]", "OnResize StageWH:", Laya.stage.width, Laya.stage.height);
    }
}