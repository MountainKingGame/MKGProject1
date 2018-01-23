namespace models.battles {
    export class BattleUtil {
       /*  public static colToX(col:number):number{
            return col*BattleConfig.si.cellSize;
        }
        public static rowToY(row:number):number{
            return row*BattleConfig.si.cellSize;
        } */
        public static gridToPos(gridVal:number):number{
            return gridVal*BattleModelConfig.si.cellSize;
        }
        static alignGrid(pos:number,min:number=0,max:number=-1):number{
            var rs:number = Math.round(pos/BattleModelConfig.si.cellSize);
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
        static checkHit(rect1:IQuadTreeRect,rect2:IQuadTreeRect){
            if(rect1.right<=rect2.x || rect1.x>=rect2.right || rect1.bottom<=rect2.y || rect1.y>=rect2.bottom){
                return false;
            }
            return true;
        }
    }
}