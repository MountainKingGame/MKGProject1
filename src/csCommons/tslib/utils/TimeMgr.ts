class TimeMgr{
    private startTime:number;
    /**
     * The time at the beginning of this frame (Read Only). 
     * This is the time in seconds since the start of the game.
     */
    public time:number;
    constructor(){
        this.startTime = Date.now();
        // setInterval(()=>this.onFrame(),1);
        setInterval(()=>this.onFrame(),CtrlConfig.si.viewMsPerFrame);
    }
    
    public onFrame(){
        this.time = Date.now()-this.startTime;
    }
}