class TestMoveSmooth{
    uis:fairygui.GComponent[] = [];
    init(){
        for (let i = 0; i < 3; i++) {
            let ui = fuis.elements_1.UI_Bullet.createInstance();
            this.uis[i] = ui;
            ui.x = 100+200*i;
            ui.y = 1000;
            CtrlFacade.si.root.addChild(ui);
        }
        // MsgMgr.si.add(CtrlConst.Msg_OnGameTick,this,this.onGameTick);
        let _tick = ()=>{
            this.onGameTick();
            window.requestAnimationFrame(_tick);
        }
        _tick();
    }
    startTime:number;
    lastTime:number;
    onGameTick(){
        if(!this.startTime){
            this.startTime = this.lastTime = new Date().getTime();
            return;
        }
        var nowTime:number = new Date().getTime();
        var gapTime = nowTime-this.lastTime;
        console.log("[info]","onUpdate",gapTime);
        this.lastTime = nowTime;
        for (let i = 0; i < this.uis.length; i++) {
            let ui = this.uis[i];
            if(ui.y<0){
                ui.y = 1000;
            }
        }
        var speedPerSecond = 500;
        this.uis[0].y -= speedPerSecond/1000*CtrlConfig.si.viewMsPerFrame;
        this.uis[1].y -= speedPerSecond/1000*(gapTime);
        this.uis[2].y = 1000-((nowTime - this.startTime)/(1000/speedPerSecond))%1000;
        console.log("[info]",this.uis[2].y);
    }
}