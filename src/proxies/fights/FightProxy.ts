class FightProxy {
    public isInit: boolean = false;
    public model: models.fights.FightModel;
    public myTank: models.fights.TankVo;
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
        this.model = new models.fights.FightModel();
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
        if ((this.currFrame) % models.fights.FightModelConfig.si.keyFrameMultiple == 0) {
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
        this.frameInputMgr.add(new FightFrameIOItem(FightFrameInputKind.MoveDirChange, 0, this.myTank.uid, dir));
    }
    onSkillTrigger(skillUid: number) {
        this.frameInputMgr.add(new FightFrameIOItem(FightFrameInputKind.SkillTrigger, 0, this.myTank.uid, skillUid));
    }
    onSkillUntrigger(skillUid: number) {
        this.frameInputMgr.add(new FightFrameIOItem(FightFrameInputKind.SkillUntrigger, 0, this.myTank.uid, skillUid));
    }

}