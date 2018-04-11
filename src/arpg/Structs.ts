class ActionTarget{
    kind:ActionTargetKind;
    /**目标的唯一id */
    uid:string
    xy:IXY
    static newPoint(xy:IXY){
        var o:ActionTarget = new ActionTarget();
        o.kind = ActionTargetKind.XY;
        o.xy = xy;
        return o;
    }
    static newUnit(uid:string){
        var o:ActionTarget = new ActionTarget();
        o.kind = ActionTargetKind.Unit;
        o.uid = uid;
        return o;
    }
}