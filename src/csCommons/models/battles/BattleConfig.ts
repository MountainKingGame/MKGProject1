namespace models.battles {
    export class BattleConfig {

        public static readonly si: BattleConfig = new BattleConfig();
        public modelFrameRate: number = 20;
        /**
         * 每一帧需要的毫秒数,这里保存整数
         */
        public modelFrameMs: number;
        constructor() {
            this.modelFrameMs = Math.round(1000 / this.modelFrameRate);
        }
        public cellSize:number = 64;
    }
}