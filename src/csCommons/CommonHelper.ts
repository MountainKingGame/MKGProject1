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
    public static indexToGridH(index:number,colMax:number):IGrid{
        return {col:index%colMax,row:Math.floor(index/colMax)};
    }
}