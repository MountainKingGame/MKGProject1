class CtrlFacade{
    public static si:CtrlFacade;
    public stage:egret.Stage;
    public ctrlMgr:CtrlMgr;
    public root: fairygui.GComponent;
    public init(runBattle:boolean){
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
        console.log("[info]",CtrlConfig.si.viewFrameRate,CtrlConfig.si.viewMsPerFrame);
        //===
        fairygui.UIPackage.addPackage("battles_1");
        fairygui.UIPackage.addPackage("elements_1");
        fairygui.UIPackage.addPackage("joysticks_1");
        fuis.battles_1.battles_1Binder.bindAll();
        fuis.elements_1.elements_1Binder.bindAll();
        fuis.joysticks_1.joysticks_1Binder.bindAll();
        //===
        this.ctrlMgr = new CtrlMgr();
        this.ctrlMgr.rootLayer = fairygui.GRoot.inst;
        //
        this.root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(this.root);
        //---
        if(runBattle){
            let battle: BattleCtrl = new BattleCtrl(fuis.battles_1.UI_Battle.createInstance());
            CtrlFacade.si.ctrlMgr.addCtrl(CtrlId.Battle, battle);
            battle.ui.setSize(this.stage.stageWidth, this.stage.stageHeight);
        }
    }
    onResize() {
        // console.log("[debug]", "OnResize StageWH:", Laya.stage.width, Laya.stage.height);
    }
}