class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage(event: egret.Event) {
        console.log('hello,world',"onAddToStage");
        egret.lifecycle.addLifecycleListener((context) => {
            // var lastTime:number = new Date().getTime();
            context.onUpdate = () => {
                // var nowTime:number = new Date().getTime();
                // console.log("[info]","onUpdate",nowTime-lastTime);
                // lastTime = nowTime;
                MsgMgr.si.send(CtrlConst.Msg_OnGameTick);
            }
        })
        egret.lifecycle.onPause = () => {
            // console.log("[info]", "egret.lifecycle.onPause");
            MsgMgr.si.send(FConst.Msg_GamePause);
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            // console.log("[info]", "egret.lifecycle.onResume");
            MsgMgr.si.send(FConst.MSG_GameResume);
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
        RES.loadGroup("ARPG");
    }
    private onResourceLoadComplete(event: RES.ResourceEvent) {
        if (RES.isGroupLoaded("preload") && RES.isGroupLoaded("ARPG")) {
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
        //TODO:
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }
    private createGameScene(): void {
        new Imports();
        new arpg.Imports();
        this.stage.addChild(fairygui.GRoot.inst.displayObject);
        if(new tests.Test().exec()){

        }else{
            //===tb
            CtrlFacade.si = new CtrlFacade();
            // CtrlFacade.si.stage = this.stage;
            // CtrlFacade.si.init(true);
            //===ARPG
            var arpgFacade = new ARPGFacade()
            arpgFacade.stage = this.stage
            arpgFacade.init()
        }
        
    }
    onResize() {
        // console.log("[debug]", "OnResize StageWH:", Laya.stage.width, Laya.stage.height);
    }

}