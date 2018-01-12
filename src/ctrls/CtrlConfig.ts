class CtrlConfig {
    private static _si: CtrlConfig;
    public static get si(): CtrlConfig {
        if (CtrlConfig._si == null) {
            CtrlConfig._si = new CtrlConfig();
        }
        return CtrlConfig._si;
    }
    public viewFrameRate:number = 30;
    /**
     * 每一帧需要的毫秒数,这里保存整数
     */
    public viewFrameMs:number;
    constructor(){
        this.viewFrameMs = Math.round(1000/this.viewFrameRate);
    }
}