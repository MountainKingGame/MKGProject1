class BattleProxy {
    public isInit: boolean = false;
    public model: models.battles.BattleModel;
    public myTank: models.battles.TankVo;
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
        this.model.frameOutputs = [];
        this.model.partialTick.tick();
        this.model.frameInputs = [];
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