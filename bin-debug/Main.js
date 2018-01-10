var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Main.prototype.onAddToStage = function (event) {
        console.log('hello,world', "onAddToStage");
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            // var lastTime:number = new Date().getTime();
            context.onUpdate = function () {
                // var nowTime:number = new Date().getTime();
                // console.log("[info]","onUpdate",nowTime-lastTime);
                // lastTime = nowTime;
            };
        });
        egret.lifecycle.onPause = function () {
            console.log("[info]", "egret.lifecycle.onPause");
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            console.log("[info]", "egret.lifecycle.onResume");
            egret.ticker.resume();
        };
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    Main.prototype.createGameScene = function () {
        //
        fairygui.UIPackage.addPackage("battles_1");
        fairygui.UIPackage.addPackage("elements_1");
        fairygui.UIPackage.addPackage("joysticks_1");
        fuis.battles_1.battles_1Binder.bindAll();
        fuis.elements_1.elements_1Binder.bindAll();
        fuis.joysticks_1.joysticks_1Binder.bindAll();
        //-
        this.stage.addChild(fairygui.GRoot.inst.displayObject);
        //===
        var root = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(root);
        root.addChild(fuis.elements_1.UI_Tank.createInstance());
        //
        var facade = new CtrlFacade();
        facade.ctrlMgr = new CtrlMgr();
        facade.ctrlMgr.facade = facade;
        facade.ctrlMgr.rootLayer = fairygui.GRoot.inst;
        //
        CtrlFacade.inst = ModelFacade.inst = facade;
        //--do my things
        var battle = new BattleCtrl(fuis.battles_1.UI_Battle.createInstance());
        facade.ctrlMgr.addCtrl(CtrlId.Battle, battle);
        // fairygui.GRoot.inst.addChild(battle.view);
        battle.view.setSize(this.stage.stageWidth, this.stage.stageHeight);
        // console.log("[debug]","StageWH:", Laya.stage.width, Laya.stage.height);
        // battle.view.setSize(Laya.stage.width, Laya.stage.height);
        // Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        // console.log(protobuf,"{protobuf}");
        new tests.TestProtobuf();
    };
    Main.prototype.onResize = function () {
        // console.log("[debug]", "OnResize StageWH:", Laya.stage.width, Laya.stage.height);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map