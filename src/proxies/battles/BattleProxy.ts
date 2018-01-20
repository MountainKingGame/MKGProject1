class BattleProxy {
    public isInit: boolean = false;
    public model: models.battles.BattleModel;
    public myTank: models.battles.TankVo;
    isKeyFrame: boolean = false;
    //补帧状态
    isChaseFrame:boolean = false;
    frameInputMgr:FrameInputMgr = new FrameInputMgr();
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
        //
        this.model.currFrame++;
        if ((this.model.currFrame) % models.battles.BattleConfig.si.keyFrameMultiple == 0) {
            this.isKeyFrame = true;
        }
        if(this.isKeyFrame){
            this.model.frameInputs = this.frameInputMgr.optimize(this.model.currFrame);
            this.model.currKeyFrame++;
        }
        this.model.frameOutputs = [];
        this.model.partialTick.tick();
        this.model.frameInputs = [];
    }
    initEvent() {
    }
    onMoveDirChange(dir:Direction4){
        // console.log("[info]","`onMoveDirChange`",dir,this.myTank.moveDir,this.model.currFrame,this.model.currKeyFrame);
        this.frameInputMgr.add(new BattleFrameIOItem(BattleFrameIOKind.MoveDirChange,0,this.myTank.uid,dir));
    }
    onSkillTrigger(skillId:number){
        this.frameInputMgr.add(new BattleFrameIOItem(BattleFrameIOKind.SkillTrigger,0,this.myTank.uid,skillId));
    }
    onSkillUntrigger(skillId:number){
        this.frameInputMgr.add(new BattleFrameIOItem(BattleFrameIOKind.SkillUntrigger,0,this.myTank.uid,skillId));
    }

}