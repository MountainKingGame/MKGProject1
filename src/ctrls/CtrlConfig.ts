class CtrlConfig {
    static si: CtrlConfig;
    public viewFrameRate:number;
    public viewMsPerFrame:number;
    init(){
        this.viewMsPerFrame = Math.round(1000/this.viewFrameRate);
    }
}