class BattleProxy {
    public isInit: boolean = false;
    facade: ModelFacade;
    public model: models.battles.BattleModel;
    public myTank: models.battles.TankVo;
    public init() {
        this.isInit = true;
        this.initEvent();
        this.model = new models.battles.BattleModel();
        this.model.facade = this.facade;
        this.model.init();
        // this.facade.netMgr.req(123,null);
        for (const key in this.model.tanks) {
            this.myTank = this.model.tanks[key];
        }

    }
    public tick() {
        this.model.frameOutputs = [];
        this.model.partialTick.tick();
        this.model.frameInputs = [];
    }
    initEvent() {
        MsgMgr.si.add(JoystickCtrl.JoystickChange, this, this.OnJoystickChange);
        MsgMgr.si.add(KeyBoardCtrl.OnKeyDown, this, this.OnKeyDown);
        MsgMgr.si.add(KeyBoardCtrl.OnKeyUp, this, this.OnKeyUp);
    }
    //===Joystick and keyboard
    OnJoystickChange(dir: Direction4) {
        this.onMoveDirChange(dir);
    }
    dirKeyCode:number[] = [KeyBoardCtrl.KEY_D,KeyBoardCtrl.KEY_S,KeyBoardCtrl.KEY_A,KeyBoardCtrl.KEY_W];
    OnKeyDown(keyCode:number,kbc:KeyBoardCtrl){
        var dirKeyCodeIndex:number = this.dirKeyCode.indexOf(keyCode);
        if(dirKeyCodeIndex>-1){
            this.onMoveDirChange(<Direction4>(dirKeyCodeIndex+1));
        }else{
            switch(keyCode){
                case KeyBoardCtrl.KEY_SPACE_BAR:
                this.onFire(1);
                break;
            }
        }
    }
    OnKeyUp(keyCode:number,kbc:KeyBoardCtrl){
        var dirKeyCodeIndex:number = this.dirKeyCode.indexOf(keyCode);
        if(dirKeyCodeIndex>-1){
            //===plan 1
            /* for (let i = 0; i < this.dirKeyCode.length; i++) {
                let keyCode = this.dirKeyCode[i];
                if(KeyBoardCtrl.si.isKeyDown(keyCode)){
                    this.onMoveDirChange(<Direction4>(dirKeyCodeIndex+1));
                    return;
                }
            }
            this.onMoveDirChange(Direction4.None); */
            //===plan 2
            var dir:Direction4 = <Direction4>(dirKeyCodeIndex+1);
            if(dir==this.myTank.dir){
                this.onMoveDirChange(Direction4.None);
            }
            //===
        }else{
            switch(keyCode){
                case KeyBoardCtrl.KEY_SPACE_BAR:
                this.onFire(0);
                break;
            }
        }
    }
    //===
    onMoveDirChange(dir:Direction4){
        if(dir!=this.myTank.moveDir){
            this.model.frameInputs.push(new BattleFrameIOItem(BattleFrameIOKind.MoveDirChange,this.model.currFrame,this.myTank.uid,dir));
        }
    }
    onFire(kind:number){
        if(kind!=this.myTank.fireKind){
            this.model.frameInputs.push(new BattleFrameIOItem(BattleFrameIOKind.FireChange,this.model.currFrame,this.myTank.uid,kind));
        }
    }
}