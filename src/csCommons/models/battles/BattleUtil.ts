namespace models.battles {
    export class BattleUtil {
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
        public static gridToPos(gridVal:number):number{
            return gridVal*BattleConfig.si.cellSize;
        }
        static alignGrid(pos:number,min:number=0,max:number=-1):number{
            var rs:number = Math.round(pos/BattleConfig.si.cellSize);
            if(rs<min){
                return min;
            }
            if(max==-1){
                return rs;
            }
            if(rs>max){
                return max;
            }
            return rs;
        }
    }
}