class CtrlConfig {
    private static _si: CtrlConfig;
    public static get si(): CtrlConfig {
        if (CtrlConfig._si == null) {
            CtrlConfig._si = new CtrlConfig();
        }
        return CtrlConfig._si;
    }
    public viewFrameRate:number = 60;
    public viewMsPerFrame:number;
    constructor(){
        this.viewMsPerFrame = Math.round(1000/this.viewFrameRate);
    }
}