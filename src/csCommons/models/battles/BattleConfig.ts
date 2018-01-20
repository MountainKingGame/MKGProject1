namespace models.battles {
    export class BattleConfig {

        public static readonly si: BattleConfig = new BattleConfig();
        public modelFrameRate: number = 30;
        /**服务器同步frame input的帧率, modelFrameRate 必须是它的整数倍 */
        public modelKeyFrameRate: number = 10;
        public keyFrameMultiple:number;
        public modelMsPerFrame: number;
        public roundDigit: number = 2;
        public cellSize: number = 64;
        public tankMoveSpeedPerSecond: number = 520;
        public tankMoveSpeedPerFrame: number;
        public bulletMoveSpeedPerSecond: number = 1000;
        public bulletMoveSpeedPerFrame: number;
        /** */
        init() {
            if(this.modelFrameRate%this.modelKeyFrameRate!=0){
                throw new Error("modelFrameRate A must be the integer multiple of b modelKeyFrameRate");
            }
            this.keyFrameMultiple = Math.ceil(this.modelFrameRate/this.modelKeyFrameRate);
            this.modelMsPerFrame = Math.round(1000 / this.modelFrameRate);
            this.tankMoveSpeedPerFrame = MathUtil.round(this.tankMoveSpeedPerSecond / this.modelFrameRate, this.roundDigit);
            this.bulletMoveSpeedPerFrame = MathUtil.round(this.bulletMoveSpeedPerSecond / this.modelFrameRate, this.roundDigit);
        }
    }
}