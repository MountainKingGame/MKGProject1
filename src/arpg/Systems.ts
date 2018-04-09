class RoleAvatarSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    protected group: entitas.Group;
    public setPool(pool: entitas.Pool) {
        this.pool = pool;
        this.group = pool.getGroup(entitas.Matcher.allOf(entitas.Matcher.Avatar));
    }
    public initialize() {
    }
    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            if(e.hasPosition){
                // console.log("[debug] Role Avatar",i,e.isPretreatMove,e.position.x,e.position.y);
                e.avatar.ui.setXY(e.position.x, e.position.y)
            }
        }
        ARPGFacade.singleton.myRoleReal.avatar.ui.setXY(
            MathUtil.lerp(ARPGFacade.singleton.myRolePretreat.position.x, ARPGFacade.singleton.myRoleNet.position.x, 0.5),
            MathUtil.lerp(ARPGFacade.singleton.myRolePretreat.position.y, ARPGFacade.singleton.myRoleNet.position.y, 0.5));
    }
}
class MovementSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    protected group: entitas.Group;

    pretreatMove:arpg.MoveComponent

    public setPool(pool: entitas.Pool) {
        this.pool = pool;
        this.group = pool.getGroup(entitas.Matcher.Move);
        this.pretreatMove = new arpg.MoveComponent()
        this.pretreatMove.kind = MoveKindEnum.None;
        MsgMgr.si.add(MsgConsts.Pretreat_ + NetConsts.RoleMoveTo, this, this.onPretreatMove)
        MsgMgr.si.add(MsgConsts.NetRes_+NetConsts.RoleMoveTo, this, this.onNetMove)
    }

    public initialize() {

    }
    onPretreatMove(res:any){
        // console.log("[debug]","onPretreatMove",res);
        this.onStartMove(ARPGFacade.singleton.myRolePretreat, res)
    }
    onNetMove(res:any){
        this.onStartMove(ARPGFacade.singleton.myRoleNet, res)
    }
    onStartMove(role:Entity,res:{currFrame:number,fromX:number,fromY:number,toX:number,toY:number}){
        var move:arpg.MoveComponent = role.move;
        move.kind = MoveKindEnum.SpeedAndDistance;
        move.toX = res.toX;
        move.toY = res.toY;
        move.startFrame = res.currFrame;
        move.lifeFrame = 0;
        // move.totalFrame = Math.ceil(MathUtil.distance(fromX,fromY,move.toX,move.toY)/move.speed);
        //--- 
        var speedXY = MathUtil.speedXY(res.fromX,res.fromY,move.toX,move.toY,move.speed);
        move.speedX = speedXY.x
        move.speedY = speedXY.y
    }

    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            if (e.move.kind == MoveKindEnum.SpeedAndDistance) {
                var move = e.move;
                var isArrive = false
                var speed:number;
                var gapFrame = ARPGFacade.singleton.currFrame-move.startFrame - move.lifeFrame + 1;
                // console.log("[debug]",gapFrame,"<-`gapFrame`");
                if(gapFrame>0){//过去的时间,如果=1则正常,超过1则说明时间过了,但这段时间都没有计算,需要补帧
                    move.lifeFrame+=gapFrame;
                    speed = move.speed*gapFrame;
                }else{
                    move.lifeFrame--
                    return
                }
                //--plan A
                /* if (move.lifeFrame >= move.totalFrame) {
                    isArrive=true;
                } */
                //--plan B
                /* if (MathUtil.distance(e.position.x, e.position.y, e.move.toX, e.move.toY)<=e.move.speed){
                    isArrive=true;
                } */
                //--plan C
                var dist = MathUtil.distance(e.position.x, e.position.y, move.toX, move.toY);
                if (dist<=speed){
                    isArrive=true;
                }else{
                    var speedXY = MathUtil.speedXY(e.position.x,e.position.y,move.toX,move.toY,speed)
                    move.speedX = speedXY.x;
                    move.speedY = speedXY.y;
                }
                //--
                if (isArrive==false) {
                    e.position.x += e.move.speedX;
                    e.position.y += e.move.speedY;
                } else {
                    e.position.x = e.move.toX;
                    e.position.y = e.move.toY;
                    e.move.kind = MoveKindEnum.None;
                }
                // console.log("[info]", e.position.x, e.position.y);
            }
        }
    }

}