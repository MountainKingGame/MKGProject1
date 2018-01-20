class CtrlConfig {
    static si: CtrlConfig;
    public viewFrameRate:number;
    public viewMsPerFrame:number;

    keyBoardCtrlKind:number = 1;
    
    init(){
        this.viewMsPerFrame = Math.round(1000/this.viewFrameRate);
    }
}