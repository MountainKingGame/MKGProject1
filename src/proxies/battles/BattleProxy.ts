class BattleProxy {
    public isInit: boolean = false;
    public model: models.battles.BattleModel;
    public myTank: models.battles.TankVo;
    /**same as model.currFrame */
    currFrame: number = 0;
    currKeyFrame: number = 0;
    isFrame: boolean = false;
    isKeyFrame: boolean = false;
    /**补帧状态*/
    isChaseFrame: boolean = false;
    frameInputMgr: FrameInputMgr = new FrameInputMgr();
    public init() {
        this.isInit = true;
        this.initEvent();
        this.model = new models.battles.BattleModel();
        this.model.init(2);
        // this.facade.netMgr.req(123,null);
        for (const key in this.model.tankMap) {
            this.myTank = this.model.tankMap[key];
            break;
        }
    }
    public tick() {
        this.isKeyFrame = false;
        //
        this.model.currFrame = this.currFrame = this.currFrame + 1;
        if ((this.currFrame) % models.battles.BattleModelConfig.si.keyFrameMultiple == 0) {
            this.isKeyFrame = true;
        }
        if (this.isKeyFrame) {
            this.model.changer.removeDumpAll();
            this.model.frameInputs = this.frameInputMgr.optimize(this.currFrame);
            this.model.currKeyFrame = this.currKeyFrame = this.currKeyFrame + 1;
        }
        this.model.frameOutputs = [];
        this.model.isKeyFrame = this.isKeyFrame;
        this.model.ticker.tick();
        this.model.frameInputs = [];
    }
    initEvent() {
    }
    onMoveDirChange(dir: Direction4) {
        // console.log("[info]","`onMoveDirChange`",dir,this.myTank.moveDir,this.model.currFrame,this.model.currKeyFrame);
        this.frameInputMgr.add(new BattleFrameIOItem(BattleFrameInputKind.MoveDirChange, 0, this.myTank.uid, dir));
    }
    onSkillTrigger(skillUid: number) {
        this.frameInputMgr.add(new BattleFrameIOItem(BattleFrameInputKind.SkillTrigger, 0, this.myTank.uid, skillUid));
    }
    onSkillUntrigger(skillUid: number) {
        this.frameInputMgr.add(new BattleFrameIOItem(BattleFrameInputKind.SkillUntrigger, 0, this.myTank.uid, skillUid));
    }

}