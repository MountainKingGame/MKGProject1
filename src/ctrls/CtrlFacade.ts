class CtrlFacade extends ModelFacade{
    public static si:CtrlFacade;
    public ctrlMgr:CtrlMgr;
    public battle:BattleCtrl;
    public stage:egret.Stage;
    public root: fairygui.GComponent;
    constructor(){
        super();
    }
    public init(){
        super.init();
        //===
        StcMap.si.init();
        //===
        fairygui.UIPackage.addPackage("battles_1");
        fairygui.UIPackage.addPackage("elements_1");
        fairygui.UIPackage.addPackage("joysticks_1");
        fuis.battles_1.battles_1Binder.bindAll();
        fuis.elements_1.elements_1Binder.bindAll();
        fuis.joysticks_1.joysticks_1Binder.bindAll();
        //===
        this.ctrlMgr = new CtrlMgr();
        this.ctrlMgr.facade = this;
        this.ctrlMgr.rootLayer = fairygui.GRoot.inst;
        //
        this.root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(this.root);
        //---
        let battle: BattleCtrl = new BattleCtrl(fuis.battles_1.UI_Battle.createInstance());
        CtrlFacade.si.ctrlMgr.addCtrl(CtrlId.Battle, battle);
        //
        battle.ui.setSize(this.stage.stageWidth, this.stage.stageHeight);
        //
    }
    onResize() {
        // console.log("[debug]", "OnResize StageWH:", Laya.stage.width, Laya.stage.height);
    }
}