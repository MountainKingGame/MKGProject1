namespace models.battles {
    export class BattleConfig {

        public static readonly si: BattleConfig = new BattleConfig();
        public modelFrameRate: number = 30;
        /**
         * 每一帧需要的毫秒数,这里保存整数
         */
        public modelFrameMs: number;
        public digit4: number = 4;
        public cellSize: number = 64;
        public tankMoveSpeedPerSecond: number = 520;
        public tankMoveSpeedPerFrame: number;
        public bulletMoveSpeedPerSecond: number = 1220;
        public bulletMoveSpeedPerFrame: number;
        constructor() {
            this.modelFrameMs = Math.round(1000 / this.modelFrameRate);
            this.tankMoveSpeedPerFrame = MathUtil.round(this.tankMoveSpeedPerSecond / this.modelFrameRate, this.digit4);
            this.bulletMoveSpeedPerFrame = MathUtil.round(this.bulletMoveSpeedPerSecond / this.modelFrameRate, this.digit4);
        }
    }
}