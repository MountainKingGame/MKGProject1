namespace models.battles {
    export class BattleModelUtil {
        /** 是否水平方向 */
        public static isHorizontalDirection4(dir: Direction4): boolean {
            return dir == Direction4.Right || dir == Direction4.Left;
        }
        /** 是否垂直方向 */
        public static isVerticalDirection4(dir: Direction4): boolean {
            return dir == Direction4.Down || dir == Direction4.Up;
        }
        /*  public static colToX(col:number):number{
             return col*BattleConfig.si.cellSize;
         }
         public static rowToY(row:number):number{
             return row*BattleConfig.si.cellSize;
         } */
        public static gridToPos(gridVal: number): number {
            return gridVal * BattleModelConfig.si.cellSize;
        }
        static alignGrid(pos: number, min: number = 0, max: number = -1): number {
            var rs: number = Math.round(pos / BattleModelConfig.si.cellSize);
            if (rs < min) {
                return min;
            }
            if (max == -1) {
                return rs;
            }
            if (rs > max) {
                return max;
            }
            return rs;
        }
        static checkHit(rect1: IQuadTreeRect, rect2: IQuadTreeRect) {
            if (rect1.right <= rect2.x || rect1.x >= rect2.right || rect1.bottom <= rect2.y || rect1.y >= rect2.bottom) {
                return false;
            }
            return true;
        }
        static msToFrame(ms: number, frameRate?: number): number {
            if (frameRate == undefined) {
                return Math.round(ms * BattleModelConfig.si.modelFrameRate / 1000);
            } else {
                return Math.round(ms * frameRate / 1000);
            }
        }
        static msToKeyFrame(ms: number): number {
            return Math.round(ms * BattleModelConfig.si.modelKeyFrameRate / 1000);
        }
        /**
         * 得到攻击cell的等级 结果和StcCellSid.Wood/Stone/Iron一致
         * @param apCell 
         * 0 => 0
         * 1~100 => 1
         * 2~200 => 2
         * 3~300 => 3
         */
        static getApCellLv(apCell:number){
            return Math.ceil(apCell/BattleModelConfig.si.cellHpMax);
        }
        /**
         * 得到对同级cell造成的伤害 外侧已经计算过对低等级cell的处理
         * @param apCell 
         * @param targetCellLv 目标cell的等级
         */
        static getApCellReal(apCell:number,targetCellLv:number){
            return apCell-(targetCellLv-1)*BattleModelConfig.si.cellHpMax;
        }
        
    }
}