namespace models.fights {
    export class FightModelConfig {

        public static readonly si: FightModelConfig = new FightModelConfig();
        public modelFrameRate: number = 30;
        /**synchro frame input fate, modelFrameRate  must be the integer multiple of it */
        public modelKeyFrameRate: number = 15;
        public keyFrameMultiple:number;
        public modelMsPerFrame: number;
        public roundDigit: number = 2;
        public cellSize: number = 64;
        public cellSizeHalf: number;
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

        cellHpMax = 100;

        init() {
            if(this.modelFrameRate%this.modelKeyFrameRate!=0){
                throw new Error("modelFrameRate must be the integer multiple of modelKeyFrameRate");
            }
            this.cellSizeHalf = this.cellSize/2;
            this.keyFrameMultiple = Math.ceil(this.modelFrameRate/this.modelKeyFrameRate);
            this.modelMsPerFrame = Math.round(1000 / this.modelFrameRate);
            this.tankMoveSpeedPerFrame = MathUtil.round(this.tankMoveSpeedPerSecond / this.modelFrameRate, this.roundDigit);
            this.bulletMoveSpeedPerFrame = MathUtil.round(this.bulletMoveSpeedPerSecond / this.modelFrameRate, this.roundDigit);
            this.rebirthInvincibleFrame = FightModelUtil.msToFrame(this.rebirthInvincibleMs);
        }
    }
}