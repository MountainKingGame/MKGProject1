class RoleAvatarSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    protected group: entitas.Group;
    public setPool(pool: entitas.Pool) {
        this.pool = pool;
        this.group = pool.getGroup(entitas.Matcher.allOf(entitas.Matcher.Avatar));
        /*  pool.getGroup(Matcher.Position).onEntityUpdated.add(
             console.log("[debug]",e.name,cid);
         }) */
        pool.getGroup(Matcher.Forward).onEntityUpdated.add((g: Group, e: Entity, cid: number, prevC: IComponent, newC: IComponent) => {
            e.avatar.ui.rotation = e.forward.degree + 90;
        });
    }
    public initialize() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            var ui = e.avatar.ui as fuis.ARPG_Elements_0.UI_RoleUI;
            ARPGFacade.si.gameView.addChild(ui);
            ui.m_txt0.text = e.name;
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
        ARPGFacade.si.myRoleLerp.avatar.ui.setXY(
            MathUtil.lerp(ARPGFacade.si.myRolePretreat.position.x, ARPGFacade.si.myRoleReal.position.x, 0.5),
            MathUtil.lerp(ARPGFacade.si.myRolePretreat.position.y, ARPGFacade.si.myRoleReal.position.y, 0.5));
    }
}
class PlayerInputSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    public setPool(pool: entitas.Pool) {
        this.pool = pool;
    }
    public initialize() {
        ARPGFacade.si.inputView.addClickListener(this.onInputClick, this);
        MsgMgr.si.add(MsgConsts.Pretreat_ + NetConsts.RoleMoveTo, this, this.onPretreatMove)
        MsgMgr.si.add(MsgConsts.NetRes_ + NetConsts.RoleMoveTo, this, this.onNetMove)
    }
    onInputClick(evt: egret.TouchEvent): void {
        var clickXY: Point = new egret.Point(evt.stageX, evt.stageY)
        ARPGFacade.si.inputView.globalToLocal(clickXY.x, clickXY.y, clickXY)
        var collideEntity: Entity;
        var entities = this.pool.getGroup(Matcher.PropLv1).getEntities()
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            if (Collider.isCollidedXYandRound(clickXY, e.position, e.propLv1.radii)) {
                if (e.isEnemy || e.isMyTeam) {
                    collideEntity = e;
                    break;
                }
            }
        }
        var myRole = ARPGFacade.si.myRoleReal
        var e = collideEntity;
        if (e != null) {
            // FakeServer.si.onSend(NetConsts.RoleSkill, { sid: 1, to: ARPGFacade.si.myRolePretreat.position })
            // this.inputView.globalToLocal(e.stageX, e.stageY, this.tempXY);
            myRole.replaceCurrOrder(OrderKind.Attack, false, ActionTarget.newUnit(e.id))
        } else {
            //==move
            myRole.replaceCurrOrder(OrderKind.Attack, false, ActionTarget.newPoint(clickXY))
            // MovementSystem.moveTo(clickXY)
        }
    }
    onPretreatMove(res: any) {
        // console.log("[debug]","onPretreatMove",res);
        this.onStartMove(ARPGFacade.si.myRolePretreat, res)
    }
    onNetMove(res: any) {
        this.onStartMove(ARPGFacade.si.myRoleReal, res)
    }
    onStartMove(role: Entity, res: { currFrame: number, from: IXY, to: IXY }) {
        role.replaceMove(MoveKindTag.Speed && MoveKindTag.Destination, res.to, res.currFrame, 0)
    }
    public execute() {
        // console.log("[debug]", ARPGFacade.si.timer.currFrame, ARPGFacade.si.timer.isKeyFrame);
    }
}

class Collider {
    private static _si: Collider;
    public static get si(): Collider {
        if (!Collider._si) Collider._si = new Collider();
        return Collider._si;
    }
    static isCollidedXYandRound(xy: IXY, roundCenter: IXY, roundRadii: number) {
        var dist: number = MathUtil.distance(xy.x, xy.y, roundCenter.x, roundCenter.y)
        return dist <= roundRadii
    }
}

// class UnitOrderSystem implements ISetPool, IInitializeSystem, IExecuteSystem {

// }

class UnitOrderSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    protected pool: entitas.Pool;
    protected group: entitas.Group;
    public setPool(pool: entitas.Pool) {
        this.pool = pool;
        this.group = pool.getGroup(entitas.Matcher.allOf(entitas.Matcher.CurrOrder));
        this.group.onEntityUpdated.add((g: Group, e: Entity, cid: number, prevC: entitas.CurrOrderComponent, newC: entitas.CurrOrderComponent) => {
            console.log("[debug]", "group.onEntityUpdated");
            if (e.currOrder.order == OrderKind.Idle) {
                e.replaceMove(MoveKindTag.None, null, 0, 0)
            } else if (e.currOrder.order == OrderKind.Attack) {
                if (e.currOrder.target.kind == ActionTargetKind.XY) {
                    MovementSystem.moveTo(e.currOrder.target.xy)
                } else if (e.currOrder.target.kind == ActionTargetKind.Unit) {
                    var te: Entity = this.pool._entities[e.currOrder.target.uid]
                    if (te) {
                        if (te.position.x != e.move.to.x && te.position.y != e.move.to.y) {
                            MovementSystem.moveTo(te.position)
                        }
                    } else {
                        e.replaceCurrOrder(OrderKind.Idle, true, null);
                    }
                }
            }
        })
    }
    public initialize() {
    }
    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            if (e.currOrder.order == OrderKind.Idle) {

            } else if (e.currOrder.order == OrderKind.Attack) {
                if (e.currOrder.target.kind == ActionTargetKind.XY) {
                    if (PointUtil.equal(e.currOrder.target.xy, e.position)) {
                        e.replaceMove(MoveKindTag.None,null,0,0)
                    }/* else{
                        if(e.move.kind!=MoveKindTag.None){
                            MovementSystem
                            .moveTo(te.position)
                        }else{
                        }
                    } */
                } else if (e.currOrder.target.kind == ActionTargetKind.Unit) {
                    var te: Entity = this.pool._entities[e.currOrder.target.uid]
                    if (te) {
                        if (e.move.kind == MoveKindTag.None) {
                            MovementSystem.moveTo(te.position)
                        } else {
                            if (PointUtil.equal(te.position, e.move.to) == false) {
                                MovementSystem.moveTo(te.position)
                            }
                        }
                    } else {
                        e.replaceCurrOrder(OrderKind.Idle, true, null);
                    }
                }
            }
        }
    }
    checkAutoAttack(e:Entity) {
    }
}

class MovementSystem implements ISetPool, IInitializeSystem, IExecuteSystem {
    static moveTo(to: IXY) {
        MsgMgr.si.send(MsgConsts.Pretreat_ + NetConsts.RoleMoveTo, {
            currFrame: ARPGFacade.si.timer.nextFrame,
            from: ARPGFacade.si.myRolePretreat.position,
            to: to
        })
        FakeServer.si.onSend(NetConsts.RoleMoveTo, { to: to })
    }

    protected pool: entitas.Pool;
    protected group: entitas.Group;


    public setPool(pool: entitas.Pool) {
        this.pool = pool;
        this.group = pool.getGroup(entitas.Matcher.Move);
        /*  this.group.onEntityUpdated.add((group: Group, entity: Entity, index: number, component: IComponent) => {
             console.log("[debug]", "this.group.onEntityUpdated:", index, entity.name, entity.move.to);
         }) */
    }

    public initialize() {

    }

    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];
            if (e.move.kind != MoveKindTag.None) {
                var move = e.move;
                var speed: number;
                var gapFrame = ARPGFacade.si.timer.currFrame - move.startFrame - move.lifeFrame + 1;
                if (gapFrame > 0) {//过去的时间,如果=1则正常,超过1则说明时间过了,但这段时间都没有计算,需要补帧
                    move.lifeFrame += gapFrame;
                    speed = e.propLv1.moveSpeed * gapFrame;
                } else {
                    //说明 move.startFrame 还没到
                    return
                }
                var dist = MathUtil.distance(e.position.x, e.position.y, move.to.x, move.to.y);
                if (dist <= speed) {
                    // isArrive = true;
                    e.replaceForward(MathUtil.rotationDegree(e.move.to.x - e.position.x, e.move.to.y - e.position.y));
                    e.replacePosition(e.move.to.x, e.move.to.y)
                    e.replaceMove(MoveKindTag.None, null, 0, 0)
                } else {
                    // var speedXY = MathUtil.speedXY(e.position.x, e.position.y, move.toX, move.toY, speed)
                    // move.speedX = speedXY.x;
                    // move.speedY = speedXY.y;
                    var t: number = speed / dist;
                    e.replaceForward(MathUtil.rotationDegree(e.move.to.x - e.position.x, e.move.to.y - e.position.y));
                    e.replacePosition(MathUtil.lerp(e.position.x, move.to.x, t), MathUtil.lerp(e.position.y, move.to.y, t))
                }
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
    onNetSkill(res: { skillSid: number }) {
        // res.skillSid
        var e: Entity = ARPGFacade.si.myRoleReal;
        // e.move.pausing = true;
    }
    public execute() {
        var entities = this.group.getEntities();
        for (var i = 0, l = entities.length; i < l; i++) {
            var e = entities[i];

        }
    }
}