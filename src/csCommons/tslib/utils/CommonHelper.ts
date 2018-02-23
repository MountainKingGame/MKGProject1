/// <reference path="../consts/Direction4.ts" />

class CommonHelper{
    public static degreeToDir4(degree:number):Direction4{
        degree = MathUtil.repeatDegree(degree);
        var dir: number = Math.round(degree / 90) + 1;
        if (dir >= 5) {//dir has only 4 values (1~4)
            dir = 1;
        }
        return <Direction4>dir;
    }
    public static dir4ToDegree(dir:Direction4):number{
        if(dir==Direction4.None){
            return 0;
        }
        return (dir-1)*90;
    }
    /** 是否水平方向 */
    public static isHorizontalDirection4(dir: Direction4): boolean {
        return dir == Direction4.Right || dir == Direction4.Left;
    }
    /** 是否垂直方向 */
    public static isVerticalDirection4(dir: Direction4): boolean {
        return dir == Direction4.Down || dir == Direction4.Up;
    }
    public static indexToGridH(index:number,colMax:number):IGrid{
        return {col:index%colMax,row:Math.floor(index/colMax)};
    }
}