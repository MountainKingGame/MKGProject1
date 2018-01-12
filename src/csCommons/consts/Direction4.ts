/**
 * 4方向
 */
enum Direction4 {
    None = 0,
    Left = 1,
    Down = 2,
    Right = 3,
    Up = 4,
}
class Direction4Util{
    public static degreeToDir(degree:number):Direction4{
        degree = MathUtil.repeatDegree(degree);
        var dir: number = Math.round(degree / 90) + 1;
        if (dir >= 5) {//dir has only 4 values (1~4)
            dir = 1;
        }
        return <Direction4>dir;
    }
    public static dirToDegree(dir:Direction4):number{
        if(dir==Direction4.None){
            return 0;
        }
        return (dir-1)*90;
    }
}