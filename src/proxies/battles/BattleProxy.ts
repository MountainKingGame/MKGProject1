class BattleProxy {
    public isInit: boolean = false;
    public model: models.battles.BattleModel;
    public myTank: models.battles.TankVo;
    isKeyFrame: boolean = false;
    //补帧状态
    isChaseFrame:boolean = false;
    public init() {
        this.isInit = true;
        this.initEvent();
        this.model = new models.battles.BattleModel();
        this.model.init(1);
        // this.facade.netMgr.req(123,null);
        for (const key in this.model.tanks) {
            this.myTank = this.model.tanks[key];
        }

    }
    public tick() {
        this.isKeyFrame = false;
        if ((this.model.currFrame + 1) % models.battles.BattleConfig.si.keyFrameMultiple == 0) {
            this.isKeyFrame = true;
        }
        this.model.frameOutputs = [];
        this.model.partialTick.tick();
        this.model.frameInputs = [];
    }
    optimizeFrameInputs(){
        
    }
    initEvent() {
    }
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