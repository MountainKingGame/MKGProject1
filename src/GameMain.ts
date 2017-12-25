/// <reference path="Auto_ReferencePaths.ts" />
/// <reference path="../lib/fairygui.d.ts" />
/// <reference path="../lib/LayaAir.d.ts" />
/// <reference path="../lib/protobuf.d.ts" />
/// <reference path="../lib/pb.d.ts" />


class GameMain {
    constructor() {
        Laya.init(600, 900, Laya.WebGL);
        // laya.utils.Stat.show(0, 0);
        //设置适配模式
        // Laya.stage.scaleMode = "showall";
        // Laya.stage.scaleMode = "noscale";
        Laya.stage.scaleMode = "full";//可以侦听stage resize
        Laya.stage.alignH = "left";
        Laya.stage.alignV = "top";
        //设置横竖屏
        // Laya.stage.screenMode = "horizontal";
        Laya.stage.screenMode = "vertical";
        // Laya.stage.screenMode = "none";

        Laya.loader.load([
            { url: "res/fuis/joysticks_1.fui", type: Laya.Loader.BUFFER },
            { url: "res/fuis/joysticks_1@atlas0.png", type: Laya.Loader.IMAGE },
            { url: "res/fuis/battles_1.fui", type: Laya.Loader.BUFFER },
            { url: "res/fuis/battles_1@atlas0.png", type: Laya.Loader.IMAGE },
            { url: "res/fuis/elements_1.fui", type: Laya.Loader.BUFFER }
        ], Laya.Handler.create(this, this.onLoaded));
    }
    onLoaded(): void {
        fairygui.UIPackage.addPackage("res/fuis/joysticks");
        fairygui.UIPackage.addPackage("res/fuis/battles");
        fuis.joysticks_1.joysticks_1Binder.bindAll();
        fuis.battles_1.battles_1Binder.bindAll();
        /*
        fairygui.UIConfig.defaultFont = "宋体";
        */
        //--init facade
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        let facade: CtrlFacade = new CtrlFacade();
        facade.ctrlMgr = new CtrlMgr();
        facade.ctrlMgr.facade = facade;
        facade.ctrlMgr.rootLayer = fairygui.GRoot.inst;
        //
        CtrlFacade.inst = ModelFacade.inst = facade;
        //--do my things
        let battle: BattleCtrl = new BattleCtrl(fuis.battles_1.UI_Battle.createInstance());
        facade.ctrlMgr.addCtrl(CtrlId.Battle, battle);
        console.log("[debug]","StageWH:", Laya.stage.width, Laya.stage.height);
        battle.view.setSize(Laya.stage.width, Laya.stage.height);
        Laya.stage.on(Laya.Event.RESIZE,this,this.onResize);

    }
    onResize(){
        console.log("[debug]","OnResize StageWH:", Laya.stage.width, Laya.stage.height);
    }
}
new GameMain();
new tests.TestProtobuf();