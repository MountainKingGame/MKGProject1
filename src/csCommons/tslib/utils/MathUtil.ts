class MathUtil{

    /**
     * 循环数值t,min到max之间。t值永远不会大于等于max的值,也永远不会小于0
     * e.g. repeat(370,0,360)=>10; repeat(-90,0,360)=>270;  repeat(752,0,360)=>32;
     */
    public static repeat(val:number,min:number,max:number):number{
        let diff:number = max - min;
        while(val>=max){
            val-=diff;
        }
        while(val<min){
            val+=diff;
        }
        return val;
    }
    public static repeatDegree(val:number):number{
        return MathUtil.repeat(val,0,360);
    }
    /**
     * 限制value的值在min和max之间， 如果value小于min，返回min。 如果value大于max，返回max，否则返回value
     * e.g. clamp(-3,0,10)=>0; clamp(30,0,12)=>12;  clamp(20,0,42)=>20;
     */
    public static clamp(val:number,min:number,max:number):number{
        if(val>=max){
            return max;
        }
        if(val<=min){
            return min;
        }
        return val;
    }
    public static magnitude(diffX:number,diffY:number):number{
        return Math.sqrt(diffX*diffX+diffY*diffY);
    }
    public static distance(ax:number,ay:number,bx:number,by:number):number{
        return MathUtil.magnitude(bx-ax,by-ay);
    }
    static round(val:number,digit:number=0){
        return Math.round(val)//TODO:
    }
}