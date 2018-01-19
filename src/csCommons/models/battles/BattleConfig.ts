namespace models.battles {
    export class BattleConfig {

        public static readonly si: BattleConfig = new BattleConfig();
        public modelFrameRate: number = 30;
        public modelMsPerFrame: number;
        public digit4: number = 4;
        public cellSize: number = 64;
        public tankMoveSpeedPerSecond: number = 520;
        public tankMoveSpeedPerFrame: number;
        public bulletMoveSpeedPerSecond: number = 1000;
        public bulletMoveSpeedPerFrame: number;
        
        init() {
            this.modelMsPerFrame = Math.round(1000 / this.modelFrameRate);
            this.tankMoveSpeedPerFrame = MathUtil.round(this.tankMoveSpeedPerSecond / this.modelFrameRate, this.digit4);
            this.bulletMoveSpeedPerFrame = MathUtil.round(this.bulletMoveSpeedPerSecond / this.modelFrameRate, this.digit4);
        }
    }
}