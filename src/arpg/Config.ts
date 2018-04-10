namespace arpg{
    export class Config{
        FloatRoundDigit = 4; 
        /**FPS */
        FramePerSecond = 60;
        MsPerFrame:number;
        BaseMoveSpeedPerSecond = 500
        BaseMoveSpeedPerFrame:number

        init(){
            this.MsPerFrame = Math.round(1000/this.FramePerSecond);
            this.BaseMoveSpeedPerFrame = MathUtil.round(this.BaseMoveSpeedPerSecond/this.FramePerSecond,this.FloatRoundDigit);
        }
    }
}