class TimerCtrl{
    /**是否暂停, 外部调用 */
    public pausing = false;
    /**每帧需要的毫秒数, 外部调用 */
    public msPerFrame = 17;
    /** keyFrame间隔,每n帧一次key帧
     * <=1则每帧都是keyFrame
     * 外部调用*/
    public gapKeyFrame = 5;


    lastMs: number = 0;
    currMs: number = 0;
    
    /**是否帧,时间未到则本帧不触发 */
    isFrame = false;
    /**是否补帧*/
    isChaseFrame =false;
    /**是否关键帧 */
    isKeyFrame = false;


    /** 上一帧多出来的时间 */
    lastFrameExtraMs: number = 0;
    /** 需要多少ms到下一个关键帧 */
    nextFrameNeedMs: number = 0;
    /**current frame */
    currFrame:number = -1;
    /**next frame */
    nextFrame:number = 0;

    
    init(){
        this.lastMs = FUtil.now();
        // MsgMgr.si.add(CtrlConst.Msg_OnGameTick, this, this.tick);
    }

    public tick() {
        //--reset
        this.isFrame = false;
        this.isKeyFrame = false;
        //--
        if (this.pausing) {
            this.lastMs = FUtil.now();
            return;
        }
        this.currMs = FUtil.now();
        //--
        if (this.isChaseFrame) {
            this.isFrame = true;
            this.nextFrameNeedMs = 0;
        } else {
            let deltaMs = this.currMs - this.lastMs;
            if (deltaMs > 1000) {
                this.lastFrameExtraMs = 0;
                this.nextFrameNeedMs = 0;
                this.lastMs = this.currMs;
                return;//TODO: 断线重连
            }
            if ((deltaMs + this.lastFrameExtraMs) >= this.msPerFrame) {
                this.isFrame = true;
                this.lastFrameExtraMs = (deltaMs + this.lastFrameExtraMs) - this.msPerFrame;
                if (this.lastFrameExtraMs >= this.msPerFrame) {
                    this.nextFrameNeedMs = 0;
                } else {
                    this.nextFrameNeedMs = this.msPerFrame - this.lastFrameExtraMs;
                }
            } else {
                this.lastFrameExtraMs += deltaMs;
                this.nextFrameNeedMs = this.msPerFrame - this.lastFrameExtraMs;
            }
        }
        if(this.isFrame){
            this.currFrame += 1;
            this.nextFrame = this.currFrame+1;
            if(this.gapKeyFrame<=1){
                this.isKeyFrame = true
            }else{
                if (this.currFrame % this.gapKeyFrame == 0) {
                    this.isKeyFrame = true;
                }
            }
        }
        //--
        this.lastMs = this.currMs;
    }
}