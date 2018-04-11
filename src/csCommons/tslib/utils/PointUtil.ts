class PointUtil{
    static equal(a:IXY,b:IXY){
        return a.x==b.x && a.y==b.y
    }
    static distance(a:IXY,b:IXY){
        return MathUtil.distance(a.x, a.y, b.x, b.y)
    }
    static rotationDegree(a:IXY,b:IXY){
        return MathUtil.rotationDegree(b.x-a.x, b.y-a.y);
    }
}