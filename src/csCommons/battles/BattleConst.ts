class BattleConst {
    public static readonly inst:BattleConst = new BattleConst();
    public modelFrameRate:number = 10;
    /**
     * 每一帧需要的毫秒数,这里保存整数
     */
    public modelFrameMs:number;
    constructor(){
        this.modelFrameMs = Math.round(1000/this.modelFrameRate);
    }
}