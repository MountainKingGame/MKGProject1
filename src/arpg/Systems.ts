class RoleAvatarSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    protected group: entitas.Group;
    public setPool(pool: entitas.Pool) {
        this.pool = pool;
        this.group = pool.getGroup(entitas.Matcher.allOf(entitas.Matcher.Avatar));
    }
    public initialize() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            var ui = e.avatar.ui as fuis.ARPG_Elements_0.UI_RoleUI;
            ARPGFacade.si.root.addChild(ui);
            ui.m_txt1.text = "";
            ui.m_txt2.text = "";
        }
    }
    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            if (e.hasPosition) {
                // console.log("[debug] Role Avatar",i,e.isPretreatMove,e.position.x,e.position.y);
                e.avatar.ui.setXY(e.position.x, e.position.y)
            }
        }
        ARPGFacade.si.myRoleReal.avatar.ui.setXY(
            MathUtil.lerp(ARPGFacade.si.myRolePretreat.position.x, ARPGFacade.si.myRoleNet.position.x, 0.5),
            MathUtil.lerp(ARPGFacade.si.myRolePretreat.position.y, ARPGFacade.si.myRoleNet.position.y, 0.5));
    }
}
class PlayerInputSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    public setPool(pool: entitas.Pool) {
        this.pool = pool;
    }
    public initialize() {
        MsgMgr.si.add(MsgConsts.Pretreat_ + NetConsts.RoleMoveTo, this, this.onPretreatMove)
        MsgMgr.si.add(MsgConsts.NetRes_ + NetConsts.RoleMoveTo, this, this.onNetMove)
    }
    onPretreatMove(res: any) {
        // console.log("[debug]","onPretreatMove",res);
        this.onStartMove(ARPGFacade.si.myRolePretreat, res)
    }
    onNetMove(res: any) {
        this.onStartMove(ARPGFacade.si.myRoleNet, res)
    }
    onStartMove(role: Entity, res: { currFrame: number, fromX: number, fromY: number, toX: number, toY: number }) {
        var move: arpg.MoveComponent = role.move;
        move.kind = MoveKindTag.Speed && MoveKindTag.Destination;
        move.toX = res.toX;
        move.toY = res.toY;
        move.startFrame = res.currFrame;
        move.lifeFrame = 0;
        // move.totalFrame = Math.ceil(MathUtil.distance(fromX,fromY,move.toX,move.toY)/move.speed);
        //--- 
        // var speedXY = MathUtil.speedXY(res.fromX, res.fromY, move.toX, move.toY, move.speed);
        // move.speedX = speedXY.x
        // move.speedY = speedXY.y
        role.replaceComponent(CoreComponentIds.Move, move)
    }
    public execute() {
        // console.log("[debug]", ARPGFacade.si.timer.currFrame, ARPGFacade.si.timer.isKeyFrame);
    }
}

class MovementSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    protected group: entitas.Group;


    public setPool(pool: entitas.Pool) {
        this.pool = pool;
        this.group = pool.getGroup(entitas.Matcher.Move);
        this.group.onEntityAdded.add((group: Group, entity: Entity, index: number, component: IComponent) => {
            entity.onComponentReplaced.add(this.onComponentReplaced.bind(this))
        })
    }

    public initialize() {

    }

    private onComponentReplaced(e: Entity, index: number, component: IComponent, replacement: IComponent) {
        if (index != CoreComponentIds.Move) {
            return;
        }
        var move: arpg.MoveComponent = replacement as arpg.MoveComponent;
        if (move.kind != MoveKindTag.None) {
            // if(move.kind | MoveKindTag.Destination){
                var degree = MathUtil.rotationDegree(move.toX-e.position.x, move.toY-e.position.y);
                e.avatar.ui.rotation = degree+90;
                // var dist = MathUtil.distance(e.position.x, e.position.y, move.toX, move.toY);
                // var speedXY = MathUtil.speedXY(e.position.x, e.position.y, move.toX, move.toY, move.speed)
                // move.speedX = speedXY.x;
                // move.speedY = speedXY.y;
                // var totalFrame = 
            // }
        }
    }

    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            if (e.move.kind != MoveKindTag.None) {
                var move = e.move;
                if(move.block){
                    move.lifeFrame++;
                    return;
                }
                //---plan D
                var speed: number;
                var gapFrame = ARPGFacade.si.timer.currFrame - move.startFrame - move.lifeFrame + 1;
                // console.log("[debug]",gapFrame,"<-`gapFrame`");
                if (gapFrame > 0) {//过去的时间,如果=1则正常,超过1则说明时间过了,但这段时间都没有计算,需要补帧
                    move.lifeFrame += gapFrame;
                    speed = e.propLv1.moveSpeed * gapFrame;
                } else {
                    //说明 move.startFrame 还没到
                    return
                }
                //--plan C
                var dist = MathUtil.distance(e.position.x, e.position.y, move.toX, move.toY);
                if (dist <= speed) {
                    // isArrive = true;
                    e.position.x = e.move.toX;
                    e.position.y = e.move.toY;
                    e.move.kind = MoveKindTag.None;
                } else {
                    // var speedXY = MathUtil.speedXY(e.position.x, e.position.y, move.toX, move.toY, speed)
                    // move.speedX = speedXY.x;
                    // move.speedY = speedXY.y;
                    var t: number = speed / dist;
                    e.position.x = MathUtil.lerp(e.position.x, move.toX, t)
                    e.position.y = MathUtil.lerp(e.position.y, move.toY, t)
                }
                // var isArrive = false
                //--plan A
                /* if (move.lifeFrame >= move.totalFrame) {
                    isArrive=true;
                } */
                //--plan B
                /* if (MathUtil.distance(e.position.x, e.position.y, e.move.toX, e.move.toY)<=e.move.speed){
                    isArrive=true;
                } */
                //--
                /*  if (isArrive == false) {
                     e.position.x += e.move.speedX;
                     e.position.y += e.move.speedY;
                 } else {
                     e.position.x = e.move.toX;
                     e.position.y = e.move.toY;
                     e.move.kind = MoveKindEnum.None;
                 } */
                // console.log("[info]", e.position.x, e.position.y);
            }
        }
    }

}

class SkillSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    protected group: entitas.Group;
    public setPool(pool: entitas.Pool) {
        this.pool = pool;
        this.group = pool.getGroup(entitas.Matcher.allOf(entitas.Matcher.Move));
        MsgMgr.si.add(MsgConsts.NetRes_ + NetConsts.RoleSkill, this, this.onNetSkill)
    }
    public initialize() {
    }
    onNetSkill(res:{skillSid:number}){
        // res.skillSid
        var e:Entity = ARPGFacade.si.myRoleNet;
        // e.move.pausing = true;
    }
    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            
        }
    }
}