class GameConst {
    public static readonly inst:GameConst = new GameConst();
    public viewFrameRate:number = 30;
    /**
     * 每一帧需要的毫秒数,这里保存整数
     */
    public viewFrameMs:number;
    constructor(){
        this.viewFrameMs = Math.round(1000/this.viewFrameRate);
    }
}