class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        console.log('hello,world',"onAddToStage");
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            // var lastTime:number = new Date().getTime();
            context.onUpdate = () => {
                // var nowTime:number = new Date().getTime();
                // console.log("[info]","onUpdate",nowTime-lastTime);
                // lastTime = nowTime;
            }
        })
        egret.lifecycle.onPause = () => {
            console.log("[info]", "egret.lifecycle.onPause");
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            console.log("[info]", "egret.lifecycle.onResume");
            egret.ticker.resume();
        }
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }
    private onItemLoadError(event: RES.ResourceEvent) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    private onResourceLoadError(event: RES.ResourceEvent) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }
    private createGameScene(): void {
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
        let facade: CtrlFacade = new CtrlFacade();
        facade.ctrlMgr = new CtrlMgr();
        facade.ctrlMgr.facade = facade;
        facade.ctrlMgr.rootLayer = fairygui.GRoot.inst;
        //
        CtrlFacade.inst = ModelFacade.inst = facade;
        //--do my things
        let battle: BattleCtrl = new BattleCtrl(fuis.battles_1.UI_Battle.createInstance());
        facade.ctrlMgr.addCtrl(CtrlId.Battle, battle);
        // fairygui.GRoot.inst.addChild(battle.view);
        battle.view.setSize(this.stage.stageWidth, this.stage.stageHeight);
        // console.log("[debug]","StageWH:", Laya.stage.width, Laya.stage.height);
        // battle.view.setSize(Laya.stage.width, Laya.stage.height);
        // Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
        // console.log(protobuf,"{protobuf}");
        //===test
        var root: fairygui.GComponent = new fairygui.GComponent();
        fairygui.GRoot.inst.addChild(root);
        root.addChild(fuis.elements_1.UI_Tank.createInstance());
        //---
        new tests.TestProtobuf();
    }
    onResize() {
        // console.log("[debug]", "OnResize StageWH:", Laya.stage.width, Laya.stage.height);
    }

}