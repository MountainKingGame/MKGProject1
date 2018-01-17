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
        MsgMgr.si.add(JoystickCtrl.JoystickChange, this, this.onJoystickChange);
        MsgMgr.si.add(KeyBoardCtrl.KeyDown, this, this.onKeyDown);
        MsgMgr.si.add(KeyBoardCtrl.KeyUp, this, this.onKeyUp);
    }
    //===Joystick and keyboard
    onJoystickChange(dir: Direction4) {
        this.onMoveDirChange(dir);
    }
    dirKeyCode:number[] = [KeyBoardCtrl.KEY_D,KeyBoardCtrl.KEY_S,KeyBoardCtrl.KEY_A,KeyBoardCtrl.KEY_W];
    onKeyDown(keyCode:number,kbc:KeyBoardCtrl){
        var dirKeyCodeIndex:number = this.dirKeyCode.indexOf(keyCode);
        if(dirKeyCodeIndex>-1){
            this.onMoveDirChange(<Direction4>(dirKeyCodeIndex+1));
        }else{
            switch(keyCode){
                case KeyBoardCtrl.KEY_SPACE_BAR:
                this.onSkillTrigger(1);
                break;
            }
        }
    }
    onKeyUp(keyCode:number,kbc:KeyBoardCtrl){
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
                this.onSkillUntrigger(1);
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
    onSkillTrigger(skillId:number){
        this.model.frameInputs.push(new BattleFrameIOItem(BattleFrameIOKind.SkillTrigger,this.model.currFrame,this.myTank.uid,skillId));
    }
    onSkillUntrigger(skillId:number){
        this.model.frameInputs.push(new BattleFrameIOItem(BattleFrameIOKind.SkillUntrigger,this.model.currFrame,this.myTank.uid,skillId));
    }

}