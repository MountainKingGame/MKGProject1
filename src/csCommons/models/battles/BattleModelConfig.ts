namespace models.battles {
    export class BattleModelConfig {

        public static readonly si: BattleModelConfig = new BattleModelConfig();
        public modelFrameRate: number = 30;
        /**synchro frame input fate, modelFrameRate  must be the integer multiple of it */
        public modelKeyFrameRate: number = 15;
        public keyFrameMultiple:number;
        public modelMsPerFrame: number;
        public roundDigit: number = 2;
        public cellSize: number = 64;
        public tankMoveSpeedPerSecond: number = 520;
        public tankMoveSpeedPerFrame: number;
        public bulletMoveSpeedPerSecond: number = 1000;
        public bulletMoveSpeedPerFrame: number;
        /** 复活需要的分数 */
        public rebirthNeedCoin:number = 100;
        /**复活后无敌持续时间 */
        public rebirthInvincibleMs:number = 5000;
        /**复活后无敌持续帧数 */
        public rebirthInvincibleFrame:number;

        init() {
            if(this.modelFrameRate%this.modelKeyFrameRate!=0){
                throw new Error("modelFrameRate must be the integer multiple of modelKeyFrameRate");
            }
            this.keyFrameMultiple = Math.ceil(this.modelFrameRate/this.modelKeyFrameRate);
            this.modelMsPerFrame = Math.round(1000 / this.modelFrameRate);
            this.tankMoveSpeedPerFrame = MathUtil.round(this.tankMoveSpeedPerSecond / this.modelFrameRate, this.roundDigit);
            this.bulletMoveSpeedPerFrame = MathUtil.round(this.bulletMoveSpeedPerSecond / this.modelFrameRate, this.roundDigit);
            this.rebirthInvincibleFrame = BattleModelUtil.msToFrame(this.rebirthInvincibleMs);
        }
    }
}